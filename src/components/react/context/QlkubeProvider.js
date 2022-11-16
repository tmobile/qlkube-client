import { useState, createContext, useEffect } from 'react';
export const QlkubeContext = createContext();

const QLKubeProvider = ({ children, qlkubeRouterHostName }) => {
  const [hostName] = useState(qlkubeRouterHostName);

  return (
    <QlkubeContext.Provider
      value={{
        hostName,
      }}
    >
      {children}
    </QlkubeContext.Provider>
  );
};

export { QLKubeProvider };