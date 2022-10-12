import { useState, createContext, useEffect } from 'react';
export const QlkubeContext = createContext();

const QLKubeProvider = ({ children, qlkubeOperatorUrl }) => {
  const [operatorUrl, setOperatorUrl] = useState(null);

  useEffect(() => {
    setOperatorUrl(qlkubeOperatorUrl);
  }, []);

 
  return (
    <QlkubeContext.Provider
      value={{
        operatorUrl,
      }}
    >
      {children}
    </QlkubeContext.Provider>
  );
};

export { QLKubeProvider };