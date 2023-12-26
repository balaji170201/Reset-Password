import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const navigate = useNavigate();

  return (
    <>
      <div style={{display:'flex',justifyContent:'center',alignItems:'center',fontSize:'2rem',fontWeight:'bold'}}>Welcome guest user</div>
      <div style={{display:'flex',justifyContent:'center'}}>
        <button type="button" class="btn btn-primary"
          onClick={() => navigate('/login')}
        >Log out</button>
      </div>
    </>
  )
}

export default Home