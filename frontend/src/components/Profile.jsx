import React, { useRef, useEffect } from 'react';
import { Link } from "react-router-dom";
import { FaLinkedin, FaChevronRight } from 'react-icons/fa';
import { useQuery, gql } from "@apollo/client";
import demo from '../assets/image/download.jpeg';

function Profile({ toggleModal, rollNo }) {
  const modalRef = useRef();
  const docRef = useRef();

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        toggleModal();
      }
    };

    docRef.current.addEventListener('mousedown', handleOutsideClick);

  }, [toggleModal]);

  const FILMS_QUERY = gql`
    query Query($rollNo: String!) {
      studentSearch(searchQuery: $rollNo) {
        name
        rollNo
        picture
        linkedIn
      }
    }
  `;

  var { loading, data } = useQuery(FILMS_QUERY, {
    variables: { rollNo },
  });

  if (!loading) {
    data = data.studentSearch[0];
    console.log(data.picture.replace('open', 'thumbnail') );
  }

  return (
    <div ref={docRef} className="fixed inset-0 flex items-center justify-center rounded-4xl shadow-md backdrop-blur-sm bg-transparent z-40">
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl p-6 max-w-[24rem] w-full mx-4 transform transition-all"
      >
        {!loading ? (
          <>
            {window.location.pathname === `${process.env.REACT_APP_BASE_URL}/familytree/` ? (
              <div className="flex justify-center items-center flex-col">
                <img
                  src={data.picture ? data.picture.replace('open', 'thumbnail')  : demo}
                  alt=""
                  className="w-48 h-48 rounded-full object-cover mb-4"
                />
                <div className="text-xl font-semibold">{data.name}</div>
                <p className="text-gray-600">{data.rollNo}</p>
              </div>
            ) : (
              <>
              <div className="flex justify-center items-center flex-col">
                <img
                  src={data.picture ? data.picture.replace('open', 'thumbnail')  : demo}
                  alt=""
                  className="w-48 h-48 rounded-full object-cover my-8"
                />
                <div className="text-xl font-semibold text-center">{data.name}</div>
                <p className="text-gray-600 text-center">{data.rollNo}</p>
                <div className='flex flex-row gap-3 items-center justify-center mt-2 text-2xl'>
                  <a href={data.linkedIn} target="_blank" rel="noopener noreferrer"><FaLinkedin className='linkedicon' /></a>
                  <Link to={`/search?q=${window.btoa(data.rollNo)}`} >
                    <FaChevronRight className='iconbutton' />
                  </Link>
                </div>
              </div>
              </>
            )}
          </>
        ) : (
          <div className="text-center py-8">Loading...</div>
        )}
      </div>
    </div>
  );
}

export default Profile;
