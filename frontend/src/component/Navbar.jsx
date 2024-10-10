import "../Style/navbar.css";
import { Link } from "react-router-dom";
import logo from "../image/logo.png";
import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { useNavigate } from 'react-router-dom';
import { FiAlignLeft } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

function Navbar({ error }) {
  const navigate = useNavigate();
  const [parentId, setParentId] = useState('');
  const [close, setclose] = useState(true)

  const FILMS_QUERY = gql`
    query Query($parentId: String!) {
      studentSearch(searchQuery: $parentId) {
        name
        rollNo
      }
        }
      `;
  const { data, loading } = useQuery(FILMS_QUERY, {
    variables: { parentId },
  });
  const handleinput = (e) => {
    setclose(true)
    if (!error) {
      setParentId(e.target.value)
    }
  }
  const toggleModal = (Id) => {
    let encoded = window.btoa(Id);
    // let decoded = window.atob(encoded);
    navigate(`/search/${encoded}`);
    setParentId('')
  }
  return (
    <div className="fixed w-[100%] z-50">
      <div className="header px-[20%] py-[10px] max-md:px-[5%] max-lg:px-[5%] max-xl:px-[10%]">
        {close ?
          <FiAlignLeft size={30} className="phone_button" onClick={() => setclose(!close)} />
          :
          <IoClose size={30} className="phone_button" onClick={() => setclose(!close)} />

        }
        {
          close ? null :
            <div className='phonenavebar'>
              <div className="phonenavebar_container">
                <Link to="/" style={window.location.pathname === 'https://devluplabs.iitj.ac.in/familytree/' ? { color: 'black' } : null}>
                  Home
                </Link>
                <Link to="/ImageTree" style={window.location.pathname === 'https://devluplabs.iitj.ac.in/familytree/ImageTree' ? { color: 'black' } : null}>
                  ImageTree
                </Link>
              </div>
            </div>
        }
        <div className="logo">
          <Link to='/'>
            <img src={logo} alt="Logo" />
          </Link>
          <div className="text-black max-lg:hidden ml-2">
            <p >Indian Institute Of Technology Jodhpur</p>
            <p>भारतीय प्रौद्योगिकी संस्थान जोधपुर</p>
          </div>
        </div>
        <div className="app_link">
          <div className="treeD">
            <Link to="/" style={window.location.pathname === 'https://devluplabs.iitj.ac.in/familytree/' ? { color: 'black' } : null}>
              Home
            </Link>
          </div>
          <div className="treeD">
            <Link to="/ImageTree" style={window.location.pathname === 'https://devluplabs.iitj.ac.in/familytree/ImageTree' ? { color: 'black' } : null}>
              ImageTree
            </Link>
          </div>
          <div className=" header_search">
            <input
              type="text"
              className="searchInput"
              placeholder="Search ..."
              value={parentId}
              onChange={(e) => handleinput(e)}
            />
          </div>
          {parentId ?
            <div className=' fixed flex justify-start top-[70px] max-md:top-[60px] right-[20%] max-md:right-[0%] max-lg:right-[5%] max-xl:right-[10%]'>
              <div className="modal-contenthelpsu">
                <div className='searchtext'>
                  {
                    loading ? <p>Loading...</p> :
                      data.studentSearch.length > 0 ?
                        data.studentSearch.slice(0, 7).map((student, index) => (
                          <div key={index}
                            onClick={() => toggleModal(student.rollNo)}
                          >
                            {student.name} ({student.rollNo})
                          </div>
                        )) : 'No match with your name or roll number'
                  }
                </div>
              </div>
            </div>
            : null
          }
        </div>
      </div>
    </div>

  );
}

export default Navbar;
