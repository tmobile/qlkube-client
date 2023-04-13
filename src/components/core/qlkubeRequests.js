import { createClient } from 'graphql-ws';
import axios from 'axios';

export const query = (
  qlkubeUrl,
  queryString, 
  clusterUrl, 
  token,
  queryVariables,
  selfManagedClient
) => {
  const connectionParams= {
    authorization: `Bearer ${token}`,
    clusterUrl,
    query: queryString,
    variables: queryVariables
  };

  const client = selfManagedClient ? selfManagedClient : createClient({
    url: qlkubeUrl,
    connectionParams
  });
  return new Promise((resolve, reject) => {
    let result;
    client.subscribe(connectionParams, {
      next: (data) => {
        result = data;
      },
      error: reject,
      complete: () => resolve(result),
    });
  });
};

export const subscribe = async (
  qlkubeUrl,
  queryString,
  clusterUrl,
  token,
  queryVariables,
  onData,
  onError,
  onComplete,
  selfManagedClient
) => {
  const client = selfManagedClient ? selfManagedClient : createClient({
    url: qlkubeUrl,
  });
  const connectionParams = {
    authorization: `Bearer ${token}`,
    clusterUrl,
    query: queryString,
    queryVariables
  };
  client.subscribe(
    connectionParams,
    {
      next: onData,
      error: onError,
      complete: onComplete,
    },
  );
  return client;
};

export const httpQuery = async (
  qlkubeUrl,
  queryString,
  token,
  queryVariables,
) => {
  try {

    const body = {
      query: queryString,
      variables: queryVariables
    };
    const config = {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      }
    };

    const result = await axios.post(qlkubeUrl, { ...body }, { ...config});
  
    return result.data;
  } catch (error) {
    console.log('err', error)
  }
};