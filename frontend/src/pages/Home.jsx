import React, {useState} from 'react'
import '../Style/home.css'
import DTree from './DTree';
import Team from './Team';
const Home = ({data}) => {
  const [teamshow,setteamshow] = useState(false)
  const team=()=>{
    setteamshow(!teamshow)
  }

  return (

    <>
    <div className="home" >
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
