import React, { useState } from "react";
import "../Styles/SearchBar.css";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import {client} from "../index.js";
import {SEARCH_QUERY} from "../Queries.js";

function SearchBar({ placeholder}) {
  const [wordEntered, setWordEntered] = useState("");
  const [retrievedData, setRetrievedData] = useState([]);

  async function FetchString(string) {
    const response = await client.query({
      query: SEARCH_QUERY,
      variables: {
        string,
      },
    })
    return response.data.studentSearch;
  }

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    if (searchWord.length < 3) {
      setRetrievedData([]);
    } else {
      FetchString(searchWord).then(value => setRetrievedData(value));
    }
  };

  const clearState = () => {
    setRetrievedData([]);
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
      {retrievedData.length !== 0 && (
        <div className="dataResult">
          {retrievedData.slice(0, 5).map((value) => {
            return (
              <p className="dataItem" >{`${value.name} (${value.rollNo})`} </p>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBar;