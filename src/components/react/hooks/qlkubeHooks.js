import { useState, useEffect, useContext } from 'react';
import { QlkubeContext } from '../context/QlkubeProvider';
import { subscribe } from '../../core/qlkubeRequests';
import { ServerStatus } from '../../enum/qlkube.enum';

const useSub = () => {
  const QLKUBE_PROVIDER = useContext(QlkubeContext);
  const { ws:_ws, socketState, qlkubeSocketStatus, updateQlkubeSocketStatus } = QLKUBE_PROVIDER;
  const [data, setData]= useState(null);
  const [socketStatus, setSocketStatus]= useState(null);
  useEffect(() => {
    _ws.onmessage = function (evt) { 
      const received_msg = evt.data;
      const jsonData= JSON.parse(received_msg)
      const eventData= jsonData?.data;
      const statusData= jsonData?.status;
      statusData === 'exists' &&updateQlkubeSocketStatus('exists')
      statusData === 'generating' &&updateQlkubeSocketStatus('generating')
      statusData&&setSocketStatus(prev => prev = statusData);
      eventData&&setData(prev => prev = eventData);
    };
    return () => {}
  }, []);
  return {
    subscribe: (query, clusterUrl, token) => subscribe(
      query,
      clusterUrl,
      token,
      _ws
    ),
    eventData:data,
    serverStatus:socketStatus
  } 
}

const useMonoSub = () => {
  const QLKUBE_PROVIDER = useContext(QlkubeContext);
  const { qlkubeUrl_ws } = QLKUBE_PROVIDER;
  const [socketStatus, setSocketStatus]= useState(null);

  return {
    monoSub: (
      authToken,
      clusterUrl,
      requestString,
      requestVariables,
      serverStatusCallback,
      errorCallback
    ) => {
      return new Promise((resolve, reject) => {

        const requestParameters= JSON.stringify({
          authorization: `Bearer ${authToken}`,
          clusterUrl,
          query: requestString,
          queryVariables: requestVariables
        });
        const _ws = new WebSocket(qlkubeUrl_ws);
        let subHandle;
        _ws.onopen = function() {
          subHandle = subscribe(
            null,
            clusterUrl,
            null,
            _ws,
            true,
            requestParameters,
          )
        };
        _ws.onmessage = function (evt) { 
          const received_msg = evt.data;
          const jsonData= JSON.parse(received_msg)
          const eventData= jsonData?.data;
          const statusData= jsonData?.status;
          if(eventData){
            if(eventData.error&&errorCallback){
              const errorReason = eventData.error?.errorPayload?.reason;
              errorCallback('qlkube error', errorReason || 'error fetching gql data');
            }
            resolve({
              data: eventData
            });
            subHandle.unsubscribe()
            _ws.close()
          }else if (statusData&&serverStatusCallback){
            statusData===ServerStatus.generating&&serverStatusCallback(ServerStatus.generating);
            statusData === ServerStatus.exists&&serverStatusCallback(ServerStatus.exists);
          }
        };
      })
    },
    socketStatus
  }
}

// ## Webpack 5 issues
// const useQuery = () => {
//   const QLKUBE_PROVIDER = useContext(QlkubeContext);
//   const { qlkubeUrl } = QLKUBE_PROVIDER;
//   return async (
//     authToken,
//     clusterUrl,
//     requestString,
//     requestVariables,
//     serverStatusCallback
//   ) => {
//     const requestParameters= JSON.stringify({
//       authorization: `Bearer ${authToken}`,
//       clusterUrl,
//       query: requestString,
//       queryVariables: requestVariables
//     });
//     const res = await request(
//       requestParameters,
//       qlkubeUrl,
//       serverStatusCallback
//     );
//     return res
//   }
// }

const useLink = () => {
  const QLKUBE_PROVIDER = useContext(QlkubeContext);
  const { socketState, ws } = QLKUBE_PROVIDER;

  const [ connectStatus, setConnectStatu ]= useState(null);

  useEffect(() => {
    setConnectStatu(socketState);
  }, [socketState])

  return {
    socketState: connectStatus,
    ws
  }
}

export {
  useQuery,
  useSub,
  useMonoSub,
  useLink
};
