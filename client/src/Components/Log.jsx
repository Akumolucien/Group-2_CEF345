import React, { useState } from 'react';
import './Log.css';
import img from './images/logo.png';
import img3 from './images/User2.png';

import img1 from './images/search.png';
import img2 from './images/hidden.png';

const Log = ({onLoginSuccess}) => {

    const handleSubmit = (event) => {
        event.preventDefault();
        // Simulate successful login (replace with actual authentication logic)
        onLoginSuccess(); 
      };
       
    const [isLoginFormVisible, setIsLoginFormVisible] = useState(true); 

    const toggleForms = () => {
      setIsLoginFormVisible(!isLoginFormVisible); 
    };

    const paragraph = {margin: 5};

   

    /*
    const [action, setAction] = useState('');

    const signupLink = () => {
        setAction('active');
   };

    const loginLink = () => {
        setAction('');
    }; 

    const[isPasswordShown, setPasswordShown] = useState
        (false);*/

    return(
        <div className={`container ${isLoginFormVisible ? 'login' : 'register'}`}>

    {isLoginFormVisible ? (

    <div className='bg login'>

    <div className='img'>
    <img src={img} alt="School logo" className='image'/>
        <h1>Schoolpaddy</h1> <br />

        <div className='user'><img src={img3} alt="" /> </div>
    </div>

    
    <div className="form" action="/Log" method="post">
        <h2>Login</h2>

        <form>
            <div className='input-box'>
         <input type="email" name="email" placeholder="Email" required/>
         </div>
         
           <div className="input-box">
         <input type="password" placeholder="Password" required/>
         </div>

         <div className='continue'>
            <input type="checkbox"/> Remember Me    
            <a href="#" className='at'>Forgot password?</a>
         </div>

            <button type='submit' className='submit' onClick={handleSubmit}>Login</button>
       
       <div className="sign-in">
       <p>Don't have an account? <a href='#' className='sign' onClick={toggleForms} /*onClick={signupLink} */ >Sign up</a></p>
       </div>
           
        </form>
    </div> 
    </div>
    ) : (

        <div className="bg register">   

        <div className='img'>
        <img src={img} alt="School logo" className='image'/>
                <h1>Schoolpaddy</h1>
            </div>  

        <div className="form">

        <h2 style={paragraph}>Create Your Account</h2>
    
                <form action="">
                    <div className="input-box">
                        <input type="text" placeholder='Full Name'  required/>
                    </div>
                    <div className="input-box">
                        <input type="email" placeholder='Email' required/>
                    </div>
    
                <div className="input-box">
                    <input type="password" placeholder='Password' required/>
                    <img src={img2} alt="" className='eye'/* onClick={() => setPasswordShown(prevState =>
                        !prevState)} */ /> 
                      
                </div>
    
                <button type='submit' className='submit'>Sign up</button>
    
                <div className="continue"> <p>Already have an account? <a href="#" onClick={toggleForms} /*onClick={loginLink}*/ className='sign'>Log in</a></p></div>
                     
                     <div><p>-------- Or --------</p></div> 
    
                     <button className='Google'><img src={img1} alt="Google logo" className='google'/> Google</button>
    
                </form>
            </div>
            </div>
    )}     
            </div>
    );
};

export default Log;