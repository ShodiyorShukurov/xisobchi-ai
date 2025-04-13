import React, { createContext, useContext, useState, useEffect } from "react";

const MainContext = createContext();

export const MainContextProvider = ({ children }) => {
  const [sidenavColor, setSidenavColor] = useState(
    localStorage.getItem("sidenavColor") || "#1890ff"
  );
  const [changeValue, setChangeValue] = useState(
    localStorage.getItem("changeValue") || "uzb"
  );

  useEffect(() => {
    localStorage.setItem("sidenavColor", sidenavColor);
    localStorage.setItem("changeValue", changeValue);
  }, [sidenavColor, changeValue]);

  return (
    <MainContext.Provider
      value={{ sidenavColor, setSidenavColor, changeValue, setChangeValue }}
    >
      {children}
    </MainContext.Provider>
  );
};

export const useMain = () => useContext(MainContext);
