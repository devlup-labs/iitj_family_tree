import React, { useEffect } from 'react'
import '../Style/team.css'
import { FaLinkedin, FaGithub} from 'react-icons/fa';
import { AiOutlineCloseCircle } from 'react-icons/ai';

const Team = ({ team, teamshow }) => {
  useEffect(() => {
    const timerId = setTimeout(() => {
    }, 3000);

    return () => clearTimeout(timerId);
  }, []);
  return (
    <div className={`modalme  ${teamshow ? 'visible' : 'notvisible'}`}>
      <div className="modal-contentme">
        <AiOutlineCloseCircle style={{ fontSize: '2rem', }} onClick={team} className='closeshomepro' />
        <p>Ashutosh kumar (B22CS015)</p>
        <div className='iconsocialmedia'>
          <a href='https://www.linkedin.com/in/ashutosh-kumar-5aa3b3259/' target='_blank'>
            <FaLinkedin style={{ fontSize: '2rem', color: 'white' }} onClick={team} />
          </a>
          <a href='https://github.com/a19hu/' target='_blank'>
            <FaGithub style={{ fontSize: '2rem', color: 'white' }} onClick={team} />
          </a>
        </div>

      </div>
    </div>
  )
}

export default Team
