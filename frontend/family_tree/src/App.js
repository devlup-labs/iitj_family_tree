import React from "react";
import './App.css';
import Help from './Components/Help.js';
import SearchBar from "./Components/SearchBar";
import StudentData from "./Data.json";
import PCard from "./Components/ProfileCard.js";
import { ThemeProvider, createTheme } from "@material-ui/core";
import D3Tree from "./Components/Tree";

function App() {

  const theme = createTheme({
    palette: {
      primary: {
        main: "#2a4158"
      }
    }
  });
  
  const x = StudentData[0];

  return (
    <ThemeProvider theme={theme}>
    <div className="App">
      <SearchBar placeholder="Enter the Name or Roll Number..." studentData={StudentData} />
      <div className="help">
        <Help />
      </div>
      
      <D3Tree />

      <PCard
        id={x.student.id}
        branch={x.student.branch}
        name={x.student.name}
        year={x.student.year}
        email={x.student.email}
        picture={x.student.picture}
        linkedIn={x.student.linkedIn}
        hometown={x.student.hometown}
        coCurriculars={x.student.coCurriculars}
        socialMedia={x.student.socialMedia}
        display= {true}
      />
    </div>
    </ThemeProvider>
  );
}

export default App;
