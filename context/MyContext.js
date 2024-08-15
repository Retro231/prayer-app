import React, { createContext, useState } from "react";

export const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [surahList, setSurahList] = useState(null);

  const appInfo = {
    surahList,
    setSurahList,
  };

  return <MyContext.Provider value={appInfo}>{children}</MyContext.Provider>;
};
