import { useState } from 'react';
import { subscribe ,query } from '../../core/qlkubeRequests';

const useSub = () => {
  const [data, setData]= useState(null);
  const [error, setError]= useState(null);
  const [isComplete, setIsComplete]= useState(false);

  const onData = (data) => setData(data)
  const onError = (e) => setError(e)
  const onComplete = () => setIsComplete(true)

  return {
    subscribe: (
      qlkubeUrl,
      queryString,
      clusterUrl,
      token,
      queryVariables,
      dataCallback,
      errorCallback,
      completeCallback
    ) => subscribe(
      qlkubeUrl,
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
  return {
    query: (
      qlkubeUrl,
      queryString, 
      clusterUrl, 
      token,
      queryVariables
    ) => {
      return query(
        qlkubeUrl,
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
