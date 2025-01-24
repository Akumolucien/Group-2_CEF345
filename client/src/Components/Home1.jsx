import React from 'react';
import './styles/styles.css';

/* import { Link, useNavigate } from 'react-router-dom'; */



const Home1 = () => {
  
  /*  const navigate = useNavigate();
  const loremText = lorem.generateParagraphs(1);

  const handleLoginClick = () => {
    navigate('/choose-user');
  };
 */
  return (
    <div className="main">
      <div className='Navbar'>

         <img className='Logo' src='' alt="Logo"/>

        <div className='NavigationLinks'>
          <a className='NavLinks' href="#">About Us</a>
          <a className='NavLinks' href="#">Products</a>
          <a className='NavLinks' href="#">Contact Us</a>
        </div>

        < div className='ButtonsContainer'>
          <button className='LoginButton' /*onClick={handleLoginClick}*/>Sign In</button>
          <div className='GuestButton' /*onClick={handleLoginClick}*/>Guest Mode</div>
        </div>

      </div>
      <div className='HomeContainer'>
        <div className='SchoolInfo'>
          <h1>School Management System</h1>
         
            <p>Lorem Text</p>
          
          <div className='AdminRegisterLink' to="/admin/register">Admin Register</div>

        </div>
        <img src='' alt="pupils" />
      </div>


    </div>
  )
};

export default Home1;