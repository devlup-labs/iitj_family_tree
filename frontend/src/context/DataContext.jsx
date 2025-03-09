import React, { createContext, useContext, useState } from "react";

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [searchtext, setsearchtext] = useState("");
  const [searchtexts, setsearchId] = useState("");
  const [search, setSearch] = useState(""); // New search state

  const updateData = (newData) => {
    setsearchtext(newData);
  };

  const updateDataId = (newData) => {
    setsearchId(newData);
  };

  const updateSearch = (newData) => {
    setSearch(newData); // Update search state
  };

  return (
    <DataContext.Provider
      value={{
        searchtext,
        updateData,
        searchtexts,
        updateDataId,
        search, // New search state
        updateSearch, // New update function
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
