import { useState } from 'react';
import { subscribe ,query } from '../../core/qlkubeRequests';
import { QlkubeContext } from '../context/QlkubeProvider';

const useSub = () => {
  const QLKUBE_PROVIDER = useContext(QlkubeContext);
  const { operatorUrl } = QLKUBE_PROVIDER;

  const [data, setData]= useState(null);
  const [error, setError]= useState(null);
  const [isComplete, setIsComplete]= useState(false);

  const onData = (data) => setData(data)
  const onError = (e) => setError(e)
  const onComplete = () => setIsComplete(true)

  return {
    subscribe: (
      queryString,
      clusterUrl,
      token,
      queryVariables,
      dataCallback,
      errorCallback,
      completeCallback
    ) => subscribe(
      operatorUrl,
      queryString,
      clusterUrl,
      token,
      queryVariables,
      dataCallback||onData,
      errorCallback||onError,
      completeCallback||onComplete
    ),
    eventData:data,
    error,
    isComplete
  } 
}

const useQuery = () => {
  const QLKUBE_PROVIDER = useContext(QlkubeContext);
  const { operatorUrl } = QLKUBE_PROVIDER;

  return {
    query: (
      queryString, 
      clusterUrl, 
      token,
      queryVariables
    ) => {
      return query(
        operatorUrl,
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
