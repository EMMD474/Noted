import React, { useEffect } from 'react'
import { createContext, useContext, useState } from 'react'

const AuthContext = createContext();



export const AuthProvider = ({ children }) => {
    const [isLogged, setIsLogged] = useState(false);
    const [token, setToken] = useState("");
    const [refreshToken, setRefreshToken] = useState("");

  return (
   <AuthContext.Provider value={{ isLogged, setIsLogged, token, setToken, refreshToken, setRefreshToken }}>
    {children}
   </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
