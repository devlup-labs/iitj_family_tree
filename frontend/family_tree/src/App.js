import React, { useEffect, useState } from "react";
import './App.css';
import Help from './Components/Help.js';
import SearchBar from "./Components/SearchBar";
import PCard from "./Components/ProfileCard.js";
import { ThemeProvider, createTheme } from "@material-ui/core";
import D3Tree from "./Components/Tree";
import {client} from "./index.js";
import {PATH_QUERY} from "./Queries.js";

function App() {

  const theme = createTheme({
    palette: {
      primary: {
        main: "#2a4158"
      }
    }
  });
  
  const [details, setDetails] = useState({ name:"IIT JODHPUR", branch:"FAMILY", year:"TREE", email:"email", picture:"picture", linkedIn:"", hometown:"", coCurriculars:"", socialMedia:"", display:false});
  const [TreeData, setTreeData] = useState({});
  const [clickedNode, setClickedNode] = useState("");

  async function FetchPath(rollNo) {
    const response = await client.query({
      query: PATH_QUERY,
      variables: {
        rollNo,
      },
    })
    return response.data.studentPath;
  }

  useEffect(() => {
    (FetchPath("Root")).then(value => {setTreeData(value);})
  },[TreeData])

  return (
    <ThemeProvider theme={theme}>
    <div className="App">
      <SearchBar placeholder="Enter the Name or Roll Number..." setClickedNode={setClickedNode}/>
      <div className="help">
        <Help />
      </div>
      {TreeData[0] && 
      <D3Tree 
        TreeData = {TreeData}
        setDetails = {setDetails}
        clickedNode = {clickedNode}
      />}

      <PCard 
        branch={details.branch}
        name={details.name}
        year={details.year}
        email={details.email}
        picture={details.picture}
        linkedIn={details.linkedIn}
        hometown={details.hometown}
        coCurriculars={details.coCurriculars}
        // socialMedia={details.socialMedia}
        display= {details.display}
      />
    </div>
    </ThemeProvider>
  );
}

export default App;
