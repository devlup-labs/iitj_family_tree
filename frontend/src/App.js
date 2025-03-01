import "./App.css";
import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DataProvider } from "./context/DataContext";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Add delay wrapper for lazy loading
const delayLoad = (promise) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(promise);
    }, 2000);
  });
}

// Modify lazy imports to include delay
const Navbar = lazy(() => delayLoad(import("./components/Navbar")));
const Home = lazy(() => delayLoad(import("./pages/Home")));
const Search = lazy(() => delayLoad(import("./pages/Search")));
const ImageTree = lazy(() => delayLoad(import("./pages/3DTree.jsx")));

function App() {
  const [data, setData] = useState([]);
  const [error, seterror] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://devluplabs.iitj.ac.in/ftadmin/tree/`
        );
        setData(response.data);
      } catch (error) {
        seterror(true);
      }
    };
    fetchData();
  }, []);

  if (error) {
    toast.error("server error", {
      autoClose: 20000,
    });
  }

  return (
    <BrowserRouter basename="/familytree/">
      <Suspense fallback={<div className="w-full h-[100vh] text-4xl flex justify-center items-center">Loading...</div>}>
        <DataProvider>
          <ToastContainer />
          <Navbar error={error} />
          <Routes>
            <Route path="/" element={<Home data={data} />} />
            <Route path="/search/:id" element={<Search />} />
            <Route path="/ImageTree" element={<ImageTree data={data} />} />
          </Routes>
        </DataProvider>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
