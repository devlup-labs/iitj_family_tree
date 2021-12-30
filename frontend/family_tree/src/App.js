import React, { useLayoutEffect, useState } from "react";
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
  
  const [details, setDetails] = useState({ name:"name", branch:"branch", year:"year", email:"email", picture:"picture", linkedIn:"", hometown:"", coCurriculars:"", socialMedia:"", display:true});

  return (
    <ThemeProvider theme={theme}>
    <div className="App">
      <SearchBar placeholder="Enter the Name or Roll Number..." studentData={StudentData} />
      <div className="help">
        <Help />
      </div>
      
      <D3Tree 
        setDetails = {setDetails}
      />

      <PCard 
        branch={details.branch}
        name={details.name}
        year={details.year}
        email={details.email}
        picture={details.picture}
        linkedIn={details.linkedIn}
        hometown={details.hometown}
        coCurriculars={details.coCurriculars}
        socialMedia={details.socialMedia}
        display= {details.display}
      />
    </div>
    </ThemeProvider>
  );
}

export default App;
