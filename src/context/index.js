import React, { useState, createContext } from "react";
import jwt from "jsonwebtoken";
// Create Context Object
export const registerContext = createContext();

// Create a provider for components to consume and subscribe to changes
const ContextProvider = (props) => {
  let tokenFromLocalStorage = localStorage.getItem("token");
  if (!tokenFromLocalStorage) tokenFromLocalStorage = "";
  // tokenFromLocalStorage = JSON.parse(tokenFromLocalStorage);
  console.log(tokenFromLocalStorage);
  console.log(localStorage.getItem("token"));
  let verify;
  try {
    verify = jwt.verify(localStorage.getItem("token"), process.env.REACT_APP_JWT_SECRET);
  } catch (error) {
    verify = null;
    localStorage.setItem("token", "");
  }

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
  };

  const [token, setToken] = useState(verify);

  return <registerContext.Provider value={{ token, setToken, logout }}>{props.children}</registerContext.Provider>;
};

export default ContextProvider;
