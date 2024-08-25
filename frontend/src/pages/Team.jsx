import React,{useEffect} from 'react'
import '../Style/team.css'
import { FaLinkedin,FaGithub, FaInstagram  } from 'react-icons/fa';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const Team = ({team,teamshow}) => {
  useEffect(() => {
    const timerId = setTimeout(() => {
    }, 3000);

    return () => clearTimeout(timerId);
  }, []);
  return (
    <div className={`modalme  ${teamshow ? 'visible' : 'notvisible'}`}>
          <div className="modal-contentme">
          <AiOutlineCloseCircle style={{ fontSize: '2rem',  }} onClick={team}  className='closeshomepro'/>
  
            <p>Ashutosh kumar (B22CS015)</p>
            <div className='iconsocialmedia'>

            <Link>
            
          <FaLinkedin style={{ fontSize: '2rem', color: 'white' }} onClick={team}/>
            </Link>
            <a href='https://github.com/a19hu/'>
            
          <FaGithub style={{ fontSize: '2rem', color: 'white' }} onClick={team}/>
            </a>
            <Link>
          <FaInstagram style={{ fontSize: '2rem', color: 'white' }} onClick={team}/>
            </Link>
            </div>

          </div>
        </div>
  )
}

export default Team
