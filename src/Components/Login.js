import React, { useState } from 'react'
import './../Style/Style.css'

import email_icon from '../assets/envelope.png'
import pwd_icon from '../assets/eye.png'
import Layout from './Layout';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {baseURL} from './constants';

function Login () {
  const [email, setEmail] = useState('');
  const [pwd, setpwd] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit=async (e)=>{
    e.preventDefault(); // Prevent the default form submission behavior
    try {
    const response = await axios.post(`${baseURL}/useracc/login/`, {
      email:email,
      password:pwd,
    });

    if (response.status === 200) {
      // Store the tokens in localStorage
      localStorage.setItem('access_token', response.data.access_token);
      localStorage.setItem('email', response.data.email);
      navigate('/loginHome')
    } else {
      alert('Login failed');
    }
  } catch (error) {
    setError(error.response.data.detail); //login failure
  }
  }

  return (
    <div>
      <Layout/>
      <div className='landing-backdrop'>
      <div className='text-container'>
        <div>
          <div className='title-login'>Login</div>
        </div>
      <form action="" className='inputs' onSubmit={handleSubmit}>
            <div className='input'>
              <img src={email_icon} alt=''/>
              <input required type='email' name='email' placeholder='Email' onChange={(e)=>setEmail(e.target.value)} value={email} />

            </div>
            <div className='input'>
              <img src={pwd_icon} alt=''/>
              <input required type='password' name='password' placeholder='Password' onChange={(e)=>setpwd(e.target.value)} value={pwd} />
            </div>
            {error?<span id='redError'>{error}</span>:null}
      <div className='submit-container'>
        <button>Login</button>
      </div>
      </form>
      </div>
      </div>
    </div>
  )
}

export default Login