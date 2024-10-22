import React from 'react'
import '../Style/profile.css'
import { Link } from "react-router-dom";
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { FaLinkedin } from 'react-icons/fa';
import { useQuery, gql } from "@apollo/client";
import { FaChevronRight } from 'react-icons/fa';
import demo from '../image/download.jpeg'
function Profile({ toggleModal, rollNo }) {
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
    data = data.studentSearch[0]
  }
  return (
    <div className="modalprofile">
      <div className="modal-contentprofile">
        {!loading ?
          <>
            {
              window.location.pathname === 'https://devluplabs.iitj.ac.in/familytree/' ?
                <div className='flex justify-center items-center flex-col'>
                  <img src={data.picture ? data.picture : demo} alt="" className='imagepro' />
                  <div>{data.name}</div>
                  <p>{data.rollNo}</p>
                </div>
                :
                <>
                  {/* <AiOutlineCloseCircle onClick={toggleModal} className='closespro' /> */}
                  <img src={data.picture ? data.picture : demo} alt="" className='imagepro' />
                  <div>{data.name}</div>
                  <p>{data.rollNo}</p>
                  <div className='flex flex-row gap-3 items-center justify-center mt-2'>
                  <a href={data.linkedIn} target="_blank" rel="noopener noreferrer"><FaLinkedin className='linkedicon' /></a>
                  <Link to={`/search/${window.btoa(data.rollNo)}`} >
                    <FaChevronRight className='iconbutton' />
                  </Link>
                  </div>
                </>
            }
          </>
          :
          "loading"}
      </div>
    </div>
  )
}

export default Profile
