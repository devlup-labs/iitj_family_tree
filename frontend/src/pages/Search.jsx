import React from 'react';
import { useQuery, gql, } from "@apollo/client";
import IitjTree from '../components/Family';
import { useNavigate,useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import background from '../assets/image/b1.jpg'

const Search = () => {
  const navigate = useNavigate();
  var { id } = useParams();
  const searchtexts=window.atob(id);
  const FILMS_QUERYS = gql`
   query Query($searchtexts: String!) {
    parent(rollNumber:$searchtexts) {
      name
      rollNo
    }
  }
  `;
  const DATA = useQuery(FILMS_QUERYS, {
    variables: { searchtexts},
  });

  const FILMS_QUERY = gql`
 query Query($searchtexts: String!) {

  studentSearch(searchQuery: $searchtexts) {
        name
        rollNo
        picture
        parentId
      }
      children(rollNumber:$searchtexts) {
     name
        rollNo
        picture
  }
  parent(rollNumber:$searchtexts) {
      name
        rollNo
        picture
  }
  sibling(rollNumber:$searchtexts) {
     name
        rollNo
        picture
  }
  student(rollNumber:$searchtexts) {
      name
        rollNo
        picture
  }
    }
  `;
  
  const { loading,data } = useQuery(FILMS_QUERY, {
    variables: { searchtexts},
  });
    console.log(DATA.data)
    if(DATA.loading) return <div className="tree">Loading...</div>
  if (!DATA.data){
    toast.info("parent id not found",{
      autoClose:2000
     })
        
    return navigate('/')

  }
  const mystyle={
    backgroundImage: `url(${background})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "100vh",
    opacity: '0.8',
    minWidth: "2400px", 
    width: "100%",
    
   };
  return (
    <div className='topmargin'>
    <ToastContainer />
      <div className="text">
        <div style={mystyle} className='blur-[10px] relative min-h-[100vh]'></div>
        <div className='absolute top-[0%]'>
          {loading ? <div className="tree" >Loading...</div> : data.studentSearch[0].parentId == null || data.parent == null ? navigate('/') : <IitjTree data={data} />}
              </div>
      </div>
    </div>
  )
}

export default Search
