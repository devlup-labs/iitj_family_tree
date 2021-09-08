import React from "react";
import './App.css';
import Help from './Components/Help.js';
import SearchBar from "./Components/SearchBar";
import StudentData from "./Data.json";

function App() {
  return (
    <div className="App">
      <SearchBar placeholder="Enter the Name or Roll Number..." data={StudentData} />
      <div className="help">
        <Help />
      </div>
    </div>
  );
}

export default App;
