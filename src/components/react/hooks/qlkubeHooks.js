import { useState, useContext } from 'react';
import { subscribe, query, httpQuery } from '../../core/qlkubeRequests';
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
      selfManagedClient,
      _routerUrl
    ) => {
      if((!routerUrl||routerUrl===null)&&!_routerUrl) return new Promise((res, rej) => rej({error: 'invalid parameters'}));
      return query(
        `${routerUrl||_routerUrl}/${clusterName}/gql`,
        queryString, 
        clusterUrl, 
        token,
        queryVariables,
        selfManagedClient
      )
    }
  }
}

const useHttpQuery = () => {
  const QLKUBE_PROVIDER = useContext(QlkubeContext);
  const { routerUrl } = QLKUBE_PROVIDER;
  return {
    query: (
      clusterName,
      queryString, 
      token,
      queryVariables,
      _routerUrl
    ) => {
      if((!routerUrl||routerUrl===null)&&!_routerUrl) return new Promise((res, rej) => rej({error: 'invalid parameters'}));
      return httpQuery(
        `${routerUrl||_routerUrl}/${clusterName}/gqlreq`,
        queryString, 
        token,
        queryVariables
      )
    }
  }
}

export {
  useQuery,
  useSub,
  useHttpQuery
};
