import React, { useState } from "react";
import "../Styles/SearchBar.css";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close"

function SearchBar({ placeholder, studentData }) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    if (searchWord.length < 3) {
      setFilteredData([]);
    } else {
      const filteredResults = studentData.filter((query) => {
        return query.name.toLowerCase().includes(searchWord.toLowerCase()) + query.rollNo.toLowerCase().includes(searchWord.toLowerCase());
      });
      setFilteredData(filteredResults);
    }
  };

  const clearState = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  return (
    <div className="search">
      <div className="searchInputs">
        <input
          type="text"
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleFilter}
        />
        <div className="searchIcon">
          {wordEntered.length === 0 ? (
            <SearchIcon />
          ) : (
            <CloseIcon id="clearBtn" onClick={clearState} />
          )}
        </div>
      </div>
      {filteredData.length !== 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 5).map((value) => {
            return (
              <p className="dataItem">{`${value.name} (${value.rollNo})`} </p>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBar;