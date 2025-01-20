import React, {useState} from 'react'
import '../assets/Style/home.css'
import TwoDTree from '../components/2DTree';
import Team from '../components/Team';
import background from '../assets/image/b1.jpg'
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
        <TwoDTree data={data}/>


    </div>
    </>
  )
}

export default Home
