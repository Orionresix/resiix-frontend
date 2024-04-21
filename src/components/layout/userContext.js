import React, { createContext, useState } from 'react';

export const UserContext = createContext();

// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }) => {
  const [email, setEmail] = useState('');

  const setLoggedInUser = (userEmail) => {
    setEmail(userEmail);
  };

  return (
    <UserContext.Provider value={{ email, setLoggedInUser }}>
      {children}
    </UserContext.Provider>
  );
};
