import { useState, createContext, useEffect } from 'react';
export const QlkubeContext = createContext();

const QlkubeProvider = ({ children, wsUrl, queryUrl, doKeepAlive }) => {
  const [ws, setWs] = useState(null);
  const [socketState, setSocketState] = useState(null);
  const [qlkubeSocketStatus, setQlkubeSocketStatus]= useState(null);

  const reconnect = async() => {
    if(ws){
      await ws?.close()
    }
  }
  const updateQlkubeSocketStatus = (stat) => {
    setQlkubeSocketStatus(stat)
  }

  useEffect(() => {
    connectWs();
  }, []);

  useEffect(() => {
    let pingIntervalRef;
    if(doKeepAlive&&ws&&socketState){
      pingIntervalRef = serverPingPong();
    }
    return () => pingIntervalRef&&clearInterval(pingIntervalRef)
  }, [ws, socketState]);

  const serverPingPong = () => {
    return setInterval(() => {
      console.log('ping')
      ws&&socketState&&ws.send('ping');
    }, 5000)
  }

  const connectWs = async() => {
    if(ws){
      await ws?.close()
    }
    const _ws = new WebSocket(wsUrl);

    setWs(prev => prev = _ws);
    _ws.onopen = function() {
      setSocketState(true)
    };
    _ws.onclose = function(e) {
      setSocketState(false)
      setTimeout(function() {
        connectWs();
      }, 1000);
    };
    _ws.onerror = function(err) {}
  }

  return (
    <QlkubeContext.Provider
      value={{
        ws,
        socketState,
        qlkubeSocketStatus,
        qlkubeUrl: queryUrl,
        qlkubeUrl_ws: wsUrl,
        reconnect,
        updateQlkubeSocketStatus
      }}
    >
      {children}
    </QlkubeContext.Provider>
  );
};

export { QlkubeProvider };
