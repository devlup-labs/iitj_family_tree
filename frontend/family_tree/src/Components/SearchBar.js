import React, { useState } from "react";
import "../Styles/SearchBar.css";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close"

function SearchBar({ placeholder, Student_Data }) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);    
    if (searchWord.length < 3) {
      setFilteredData([]);
    } else {
      const FilteredResults = Student_Data.filter((value) => {
        return value.student.name.toLowerCase().includes(searchWord.toLowerCase()) + value.student.id.toLowerCase().includes(searchWord.toLowerCase());
      });   
      setFilteredData(FilteredResults);
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
              // <a className="dataItem"  href={value.link} rel="noreferrer" target="_blank">
                <p className="dataItem">{value.student.name + " (" + value.student.id + ")"} </p>
              // </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
