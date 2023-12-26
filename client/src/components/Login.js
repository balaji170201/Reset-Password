import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {

    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/login', {email,password})
        .then((res) => {
            if(res.data.Status === "Success"){
                if(res.data.role === 'admin'){
                    navigate('/dashboard')
                }else{
                    navigate('/home')
                }
            }
        })
        .catch((err) => {
            console.log(err);
        })

    }

  return (
    <div>
        <div className='d-flex justify-content-center align-items-center bg-secondary vh-100'>
        <div className='bg-white p-3 rounded w-25'>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
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
                <button type='submit' className='btn btn-success w-100 rounded-0'>Login</button>
            </form>
            <Link to='/forgotPassword'><p>Forgot Password?</p></Link>
            <div style={{textAlign:'center',marginTop:'10px'}}>
                <p>Don't have an account? <Link to='/'><span style={{color:'#00bcd4'}}><strong>Register</strong></span></Link></p>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Login