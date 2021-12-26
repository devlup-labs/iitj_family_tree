import React, { useState } from "react";
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
  
  const [name, setCardName] = useState("name");
  const [branch, setCardBranch] = useState("branch");
  const [year, setCardYear] = useState("year");
  const [email, setCardEmail] = useState("email");
  const [picture, setCardPicture] = useState("picture");
  const [linkedIn, setCardLinkedIn] = useState("name");
  const [hometown, setCardHometown] = useState("name");
  const [coCurriculars, setCardCoCurriculars] = useState("");
  const [socialMedia, setCardSocialMedia] = useState("name");
  const [display, setCardDisplay] = useState(true);

  return (
    <ThemeProvider theme={theme}>
    <div className="App">
      <SearchBar placeholder="Enter the Name or Roll Number..." studentData={StudentData} />
      <div className="help">
        <Help />
      </div>
      
      <D3Tree setCardName={setCardName}
        setCardBranch={setCardBranch}
        setCardYear={setCardYear}
        setCardEmail={setCardEmail}
        setCardPicture={setCardPicture}
        setCardLinkedIn={setCardLinkedIn}
        setCardHometown={setCardHometown}
        setCardCoCurriculars={setCardCoCurriculars}
        setCardSocialMedia={setCardSocialMedia}
        setCardDisplay = {setCardDisplay}
      />

      <PCard 
        branch={branch}
        name={name}
        year={year}
        email={email}
        picture={picture}
        linkedIn={linkedIn}
        hometown={hometown}
        coCurriculars={coCurriculars}
        socialMedia={socialMedia}
        display= {display}
      />
    </div>
    </ThemeProvider>
  );
}

export default App;
