import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [searchtext, setsearchtext] = useState('');
  const [searchtexts, setsearchId] = useState('');


  const updateData = (newData) => {
    setsearchtext(newData);
  };
  const updateDataId = (newData) => {
    setsearchId(newData);
  };
  const updatesearch = (newData) => {
    setsearchId(newData);
  };
  return (
    <DataContext.Provider value={{ searchtext, updateData,searchtexts ,updateDataId,updatesearch}}>
      {children}
    </DataContext.Provider>
  );
};
