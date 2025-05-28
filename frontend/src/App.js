import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import React, { Suspense, useEffect, useState } from 'react';
import { DataProvider } from './context/DataContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client';

// Lazy load components
const Home = React.lazy(() => import('./pages/Home'));
const Search = React.lazy(() => import('./pages/Search'));
const ImageTree = React.lazy(() => import('./pages/3DTree'));

function generateQuery(depth) {
  if (depth === 0) {
    return `
      rollNo
      name
      parentId
      picture
    `;
  }
  return `
    rollNo
    name
    parentId
    picture
    children {
      ${generateQuery(depth - 1)}
    }
  `;
}

const GET_Query = gql`
  query GetNestedTree {
    studentTree {
      ${generateQuery(10)}
    }
  }
`;

function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const { error: queryError, data: treeData } = useQuery(GET_Query);

  useEffect(() => {
    if (treeData && treeData.studentTree) {
      setData(treeData.studentTree);
    }
    if (queryError) {
      setError(true);
      toast.error("GraphQL query error", {
        autoClose: 20000
      });
    }
  }, [treeData, queryError]);

  // if (loading) return <p>Loading...</p>;

  return (
    <BrowserRouter>
      <DataProvider>
        <ToastContainer />
        <Navbar error={error} />
        <Suspense fallback={<div className='w-full h-[100vh] flex justify-center items-center text-4xl bg-[rgb(147,170,213)] text-white'>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home data={data} />} />
            <Route path="/search" element={<Search />} />
            <Route path="/ImageTree" element={<ImageTree data={data} />} />
          </Routes>
        </Suspense>
      </DataProvider>
    </BrowserRouter>
  );
}

export default App;
