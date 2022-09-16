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
    ) => subscribe(
      qlkubeUrl,
      queryString,
      clusterUrl,
      token,
      queryVariables,
      onData,
      onError,
      onComplete
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
