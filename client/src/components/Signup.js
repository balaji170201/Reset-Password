import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import { Link,useNavigate } from 'react-router-dom';

const Signup = () => {

    const [name,setName] = useState();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/register',{name,email,password})
        .then((res) => {
            navigate('/login')
        })
        .catch((err) => {
            console.log(err);
        })

    }

  return (
    <div className='d-flex justify-content-center align-items-center bg-secondary vh-100'>
        <div className='bg-white p-3 rounded w-25'>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor='name'>
                        <strong>Name</strong>
                    </label>
                    <input 
                        type='text'
                        placeholder='Enter your Name'
                        autoComplete='off'
                        name='name'
                        value={name}
                        className='form-control     rounded-0'
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className='mb-3'>
                    <label htmlFor='email'>
                        <strong>Email</strong>
                    </label>
                    <input 
                        type='email'
                        placeholder='Enter your Email'
                        autoComplete='off'
                        name='email'
                        value={email}
                        className='form-control     rounded-0'
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className='mb-3'>
                    <label htmlFor='password'>
                        <strong>Password</strong>
                    </label>
                    <input 
                        type='password'
                        placeholder='Enter your password'
                        autoComplete='off'
                        name='password'
                        value={password}
                        className='form-control     rounded-0'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type='submit' className='btn btn-success w-100 rounded-0'>Register</button>
            </form>
            <div style={{textAlign:'center',marginTop:'10px'}}>
                <p>Already have an account? <Link to='/login'><span style={{color:'#00bcd4'}}><strong>Login</strong></span></Link></p>
            </div>
        </div>
    </div>
  )
}

export default Signup