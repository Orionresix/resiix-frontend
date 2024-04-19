// UserContext.js
import React, { createContext, useState } from 'react';

const TenantContext = createContext();

// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const loginUser = (userData) => {
    setUser(userData);
  };

  const logoutUser = () => {
    setUser(null);
  };

  return (
    <TenantContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </TenantContext.Provider>
  );
};

export default TenantContext;
