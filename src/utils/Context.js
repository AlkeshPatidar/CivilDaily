
import React, { createContext, useState, useContext } from 'react';

const LoggedInContext = createContext();

export const LoginCheckProvider = ({ children }) => {
  const [loggedInby, setloggedInby] = useState('User');

  return (
    <LoggedInContext.Provider value={{ loggedInby, setloggedInby }}>
      {children}
    </LoggedInContext.Provider>
  );
};

export const useLoginCheck = () => {
  return useContext(LoggedInContext);
};
