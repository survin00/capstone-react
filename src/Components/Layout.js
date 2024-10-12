import React, {useState} from 'react';
import { Outlet } from 'react-router-dom';
import logo from '../assets/logo-color.png';
import { useNavigate, Link } from 'react-router-dom';

function Layout() {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('access_token')
  console.log(localStorage?.getItem('email')?.split('@')[0],"localStorage.getItem('email').split('@')[0]")
  const isAdmin = localStorage?.getItem('email')?localStorage?.getItem('email')?.split('@')[0] === 'admin': '';
  const handleHomeClick=()=>{
    if(!accessToken) navigate('/');
    else navigate('/LoginHome')
  }
  return (
    <div>
      <header className='header'>
        <div className={'headofLayout'}>
            <img src={logo} style={{'width':'300px', 'height':'250px'}} onClick={handleHomeClick} className='furnifixLogo'/>
        
        
        <nav className='navBar'>
          <ul>
            {
              (isAdmin && accessToken) && <li><Link style={{
        color: 'black',
        textDecoration: 'none',
        margin: '5px'
      }} to="/createUser" className='link'>Create User</Link></li>
            }
            {accessToken ?(<><li><Link style={{
        color: 'black',
        textDecoration: 'none',
        margin: '5px'
      }} to="/createTicket" className='link'>Create Ticket</Link></li>
        <li><Link style={{
        color: 'black',
        textDecoration: 'none',
        margin: '5px'
      }} className='link' to="/displayTickets">Search Tickets</Link></li>
            <li><Link style={{
        color: 'black',
        textDecoration: 'none',
        margin: '5px'
      }} to="/logout" className='link'>Logout</Link></li></>):(<li><Link style={{
        color: 'black',
        textDecoration: 'none',
        margin: '5px'
      }} to="/login" className='link'>Login</Link></li>)}
          </ul>
        </nav></div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;