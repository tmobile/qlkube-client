import { useState, useContext } from 'react';
import { subscribe ,query } from '../../core/qlkubeRequests';
import { QlkubeContext } from '../context/QlkubeProvider';

const useSub = () => {
  const QLKUBE_PROVIDER = useContext(QlkubeContext);
  const { routerUrl } = QLKUBE_PROVIDER;

  const [data, setData]= useState(null);
  const [error, setError]= useState(null);
  const [isComplete, setIsComplete]= useState(false);

  const onData = (data) => setData(data)
  const onError = (e) => setError(e)
  const onComplete = () => setIsComplete(true)
  return {
    subscribe: (
      clusterName,
      queryString,
      clusterUrl,
      token,
      queryVariables,
      dataCallback,
      errorCallback,
      completeCallback
    ) => {
      console.log('qlkube-client', `${routerUrl}/${clusterName}/gql`)

      subscribe(
      `${routerUrl}/${clusterName}/gql`,
      queryString,
      clusterUrl,
      token,
      queryVariables,
      dataCallback||onData,
      errorCallback||onError,
      completeCallback||onComplete
    )
  },
    eventData:data,
    error,
    isComplete
  } 
}

const useQuery = () => {
  const QLKUBE_PROVIDER = useContext(QlkubeContext);
  const { routerUrl } = QLKUBE_PROVIDER;

  return {
    query: (
      clusterName,
      queryString, 
      clusterUrl, 
      token,
      queryVariables
    ) => {
      return query(
        `${routerUrl}/${clusterName}/gql`,
        queryString, 
        clusterUrl, 
        token,
        queryVariables
      )
    }
  }
}

export {
  useQuery,
  useSub
};
