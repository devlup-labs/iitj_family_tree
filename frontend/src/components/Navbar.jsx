import React, { useState,useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import "../assets/Style/navbar.css";
import logo from "../assets/image/logo.png";
import { FiAlignLeft } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { useData } from "../context/DataContext";

const SEARCH_QUERY = gql`
  query Query($searchText: String!) {
    studentSearch(searchQuery: $searchText) {
      name
      rollNo
    }
  }
`;

const threshold = 600;

const Navbar = ({ error }) => {
  const { updateSearch } = useData();
  const [searchText, setSearchText] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [ isMobile, setIsMobile ] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      
      if (currentWidth <= threshold ) {
        setIsMobile(true);
      } else if (currentWidth > threshold ) {
        setIsMobile(false);
      }
      
    };
    handleResize();
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { data, loading } = useQuery(SEARCH_QUERY, {
    variables: { searchText },
    skip: !searchText,
  });

  const handleSearchInput = (e) => {
    if (!error) {
      setSearchText(e.target.value);
    }
  };

  const handleStudentSelect = (rollNo) => {
    updateSearch(rollNo);
    setSearchText("");
    if(isMobile)toggleMenu();
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="fixed w-[100%] z-50">
      <div className="header px-[20%] py-[10px] max-md:px-[5%] max-lg:px-[5%] max-xl:px-[10%]">
        {isMenuOpen ? (
          <IoClose size={30} className="phone_button" onClick={toggleMenu} />
        ) : (
          <FiAlignLeft
            size={30}
            className="phone_button"
            onClick={toggleMenu}
          />
        )}

        {isMenuOpen && (
          <div className="phonenavebar !top-[52px]">
            <div className="phonenavebar_container">
              <NavLink
                to="/"
                onClick={toggleMenu}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Home
              </NavLink>
              <NavLink
                to="/ImageTree"
                onClick={toggleMenu}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                ImageTree
              </NavLink>
              <div className="header_search mt-4">
            <input
              type="text"
              className="searchInput"
              placeholder="Search ..."
              value={searchText}
              onChange={handleSearchInput}
            />
          </div>
              {searchText && (
            <div className="fixed flex justify-start w-[100vw] top-[70px] max-md:top-[200px] right-[20%] max-md:right-[0%] max-lg:right-[5%] max-xl:right-[10%]">
              <div className="modal-contenthelpsu w-full">
                <div className="searchtext">
                  {loading ? (
                    <p>Loading...</p>
                  ) : data?.studentSearch?.length > 0 ? (
                    data.studentSearch.slice(0, 7).map((student, index) => (
                      <div
                        key={index}
                        onClick={() => handleStudentSelect(student.rollNo)}
                      >
                        {student.name} ({student.rollNo})
                      </div>
                    ))
                  ) : (
                    "No match with your name or roll number"
                  )}
                </div>
              </div>
            </div>
          )}
            </div>
          </div>
        )}

        <div className="logo">
          <Link to="/">
            <img src={logo} alt="Logo" />
          </Link>
          <div className="text-black max-lg:hidden ml-2">
            <p>Indian Institute Of Technology Jodhpur</p>
            <p>भारतीय प्रौद्योगिकी संस्थान जोधपुर</p>
          </div>
        </div>

        <div className="app_link">
          <div className="treeD">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Home
            </NavLink>
          </div>
          <div className="treeD">
            <NavLink
              to="/ImageTree"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              ImageTree
            </NavLink>
          </div>
          
          {!isMobile && <><div className="header_search">
            <input
              type="text"
              className="searchInput"
              placeholder="Search ..."
              value={searchText}
              onChange={handleSearchInput}
            />
          </div>

          {searchText && (
            <div className="fixed flex justify-start top-[70px] max-md:top-[60px] right-[20%] max-md:right-[0%] max-lg:right-[5%] max-xl:right-[10%]">
              <div className="modal-contenthelpsu">
                <div className="searchtext">
                  {loading ? (
                    <p>Loading...</p>
                  ) : data?.studentSearch?.length > 0 ? (
                    data.studentSearch.slice(0, 7).map((student, index) => (
                      <div
                        key={index}
                        onClick={() => handleStudentSelect(student.rollNo)}
                      >
                        {student.name} ({student.rollNo})
                      </div>
                    ))
                  ) : (
                    "No match with your name or roll number"
                  )}
                </div>
              </div>
            </div>
          )} </>
          }
         
        </div>
      </div>
    </div>
  );
};

export default Navbar;
