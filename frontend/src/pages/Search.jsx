import React from 'react';
import { useQuery, gql, } from "@apollo/client";
import IitjTree from './IitjTree';
import { useNavigate,useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        year
        picture
        parentId
      }
      children(rollNumber:$searchtexts) {
     name
        rollNo
        year
        picture
  }
  parent(rollNumber:$searchtexts) {
      name
        rollNo
        year
        picture
  }
  sibling(rollNumber:$searchtexts) {
     name
        rollNo
        year
        picture
  }
  student(rollNumber:$searchtexts) {
      name
        rollNo
        year
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
  return (
    <div className='topmargin'>
    <ToastContainer />
      <div className="text">
        <div className='treediv'>
          {loading ? <div className="tree">Loading...</div> : data.studentSearch[0].parentId == null || data.parent == null ? navigate('/') : <IitjTree data={data} />}
              </div>
      </div>
    </div>
  )
}

export default Search
