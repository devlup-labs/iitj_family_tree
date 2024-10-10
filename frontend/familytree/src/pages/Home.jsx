import React, {useState} from 'react'
import '../Style/home.css'
import DTree from './DTree';
import Team from './Team';
import background from '../image/b1.jpg'
const Home = ({data}) => {
  const [teamshow,setteamshow] = useState(false)
  const team=()=>{
    setteamshow(!teamshow)
  }
  const mystyle={
    backgroundImage: `url(${background})`,
    backdropFilter: "blur(6px)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "100vh",
    opacity: '0.8',
   };
  return (

    <>
    <div className="home" style={mystyle} >
    </div>
    <div className="typewriterStyle" >
       <div className='team' onClick={team}>Team</div> 
       {teamshow && (
        <Team team={team} teamshow={teamshow}/>
       )}    
        <DTree data={data}/>


    </div>
    </>
  )
}

export default Home
