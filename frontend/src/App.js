import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Search from './pages/Search';
import { DataProvider } from './context/DataContext';
import ImageTree from './pages/3DTree';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [data, setData] = useState([]);
  const [error,seterror]=useState(false)
 useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://devluplabs.iitj.ac.in/ftadmin/tree/`);
        setData(response.data);
      } catch (error) {
        seterror(true)
      }
    };
    fetchData();
  }, []);

  if(error){
     toast.error("server error",{
      autoClose:20000
     })
  }
//  console.log(window.location.pathname)
  return (
    
    <BrowserRouter
 basename="/familytree/"
	  >
    <DataProvider>
    <ToastContainer />
    <Navbar error={error}/>
   <Routes>
     <Route path="/" element={<Home data={data}/>} />
     <Route path="/search/:id" element={<Search />} />
     <Route path="/ImageTree" element={<ImageTree data={data}/>} />
   </Routes>
     </DataProvider>
 </BrowserRouter>
  );
}

export default App;
