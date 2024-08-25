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
        year
        picture
        linkedIn
      }
        }
      `;
  var { loading, data } = useQuery(FILMS_QUERY, {
    variables: { rollNo },
  });
  console.log()
  if (!loading) {
    data = data.studentSearch[0]
  }
  return (
    <div className="modalprofile">
      <div className="modal-contentprofile">
        {!loading ?
          <>
            {
              window.location.pathname === '/' ?
                null
                :
                <AiOutlineCloseCircle onClick={toggleModal} className='closespro' />
            }
            <img src={data.picture ? data.picture : demo} alt="" className='imagepro' />
            <p><span>Name:</span> {data.name}</p>
            <p><span>ROLL NUMBER : </span>{data.rollNo}</p>
            <p><span>BATCH OF {parseInt(data.year) + 4} </span></p>
            {
              window.location.pathname === '/' ?
                null
                :
                <>
                  <a href={data.linkedIn} ><FaLinkedin className='linkedicon' /></a>
                  <Link to={`/search/${window.btoa(data.rollNo)}`} >
                    <FaChevronRight className='iconbutton' />
                  </Link>
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
