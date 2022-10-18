import { useState, createContext, useEffect } from 'react';
export const QlkubeContext = createContext();

const QLKubeProvider = ({ children, qlkubeRouterUrl }) => {
  const [routerUrl, setRouterUrl] = useState(null);

  useEffect(() => {
    setRouterUrl(qlkubeRouterUrl);
  }, []);

 
  return (
    <QlkubeContext.Provider
      value={{
        routerUrl,
      }}
    >
      {children}
    </QlkubeContext.Provider>
  );
};

export { QLKubeProvider };