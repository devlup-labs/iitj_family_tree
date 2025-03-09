import React, { useEffect,useRef } from 'react'
import '../assets/Style/team.css'
import { FaLinkedin, FaGithub} from 'react-icons/fa';
import { AiOutlineCloseCircle } from 'react-icons/ai';

const Team = ({ team, teamshow }) => {

    const modalRef = useRef();
    const docRef = useRef();
  
    
    // Team members data
    const teamMembers = [
      {
        name: "Ashutosh Kumar",
        id: "B22CS015",
        linkedin: "https://www.linkedin.com/in/ashutosh-kumar-5aa3b3259/",
        github: "https://github.com/a19hu/"
      },
      {
        name: "Harshit Saini",
        id: "B24CS1031",
        linkedin: "https://www.linkedin.com/in/harshitsaini18/",
        github: "https://github.com/harshitsaini17"
      },
      {
        name: "Anshika Jha",
        id: "B24CS1010",
        linkedin: "https://www.linkedin.com/in/anshika-jha-2b2207326/",
        github: "https://github.com/dkstlzk"
      }
    ];
    
    useEffect(() => {
      const handleOutsideClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
          team();
        }
      };
  
      docRef.current.addEventListener('mousedown', handleOutsideClick);
  
    }, [teamshow,team]);

  useEffect(() => {
    const timerId = setTimeout(() => {
    }, 3000);

    return () => clearTimeout(timerId);
  }, []);
  
  return (
    <div ref={docRef} className={`modalme ${teamshow ? 'visible' : 'notvisible'}`}>
      <div ref={modalRef} className="modal-contentme">
        <div className="team-header">
          <h2>Our Team</h2>
          <AiOutlineCloseCircle 
            className='closeshomepro' 
            onClick={team} 
            style={{ fontSize: '2rem' }} 
          />
        </div>
        
        <div className="team-members-grid">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-member-card">
              <h3>{member.name}</h3>
              <p className="member-id">{member.id}</p>
              <div className='iconsocialmedia'>
                <a href={member.linkedin} target='_blank' rel="noreferrer">
                  <FaLinkedin style={{ fontSize: '1.8rem', color: 'white' }} />
                </a>
                <a href={member.github} target='_blank' rel="noreferrer">
                  <FaGithub style={{ fontSize: '1.8rem', color: 'white' }} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Team
