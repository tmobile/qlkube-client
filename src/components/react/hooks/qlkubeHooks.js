import { useState, useContext } from 'react';
import { subscribe, query, httpQuery } from '../../core/qlkubeRequests';
import { QlkubeContext } from '../context/QlkubeProvider';

const useSub = () => {
  const QLKUBE_PROVIDER = useContext(QlkubeContext);
  const { hostName } = QLKUBE_PROVIDER;

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
      `wss://${hostName}/${clusterName}/gql`,
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
  const { hostName } = QLKUBE_PROVIDER;
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
      if((!hostName||hostName===null)&&!_routerUrl) return new Promise((res, rej) => rej({error: 'invalid parameters'}));
      return query(
        _routerUrl ? _routerUrl : `wss://${hostName}/${clusterName}/gql`,
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
  return {
    query: (
      clusterName,
      queryString, 
      token,
      queryVariables,
      _routerUrl
    ) => {
      const hostName = QLKUBE_PROVIDER?.hostName;

      if((!hostName||hostName===null)&&!_routerUrl) return new Promise((res, rej) => rej({error: 'invalid parameters'}));
      return httpQuery(
        _routerUrl ? _routerUrl : `https://${hostName}/${clusterName}/gqlreq`,
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
