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
      completeCallback,
      selfManagedClient
    ) => subscribe(
      `${routerUrl}/${clusterName}/gql`,
      queryString,
      clusterUrl,
      token,
      queryVariables,
      dataCallback||onData,
      errorCallback||onError,
      completeCallback||onComplete,
      selfManagedClient
    ),
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
      queryVariables,
      selfManagedClient
    ) => {
      if(!(routerUrl&&queryString)) return {error: 'invalid parameters'};
      return query(
        `${routerUrl}/${clusterName}/gql`,
        queryString, 
        clusterUrl, 
        token,
        queryVariables,
        selfManagedClient
      )
    }
  }
}

export {
  useQuery,
  useSub
};
