import { useState, createContext, useEffect } from 'react';
export const QlkubeContext = createContext();

const QlkubeProvider = ({ children, qlkubeOperatorUrl }) => {
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

export { QlkubeProvider };