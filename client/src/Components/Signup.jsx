import React, { useState } from 'react';
import "./Log.css";
import img from './images/logo.png';
import img1 from './images/search.png';
import img2 from './images/hidden.png';

const  Signup= () => {
    const[isPasswordShown, setPasswordShown] = useState
    (false);


    return(
        <div className="bg register" >
                      
                   <div className='img'>
                   <img src={img} alt="School logo" className='image'/>
                           <h1>Schoolpaddy</h1>
                        
                       </div>      
           
                   <div className="form">
           
                   <h2>Create Your Account</h2>
           
                       <form action="">
           
                           <div className="input-box">
                               <input type="text" placeholder='Full Name'  required/>
                           </div>
                           <div className="input-box">
                               <input type="email" placeholder='Email' required/>
                           </div>
           
                       <div className="input-box">
                           <input type="password" placeholder='Password' required/>
                           <img src={img2} alt="" className='eye' onClick={() => setPasswordShown(prevState =>
                               !prevState)} /> 
                             
                       </div>
           
                       <button type='submit' className='submit'>Sign un</button>
           
                       <div className="continue"> <p>Already have an account? <a href="#" onClick={loginLink} className='sign'>Log in</a></p></div>
                            
                            <div><p>-------- Or --------</p></div> 
           
                            <button className='Google'><img src={img1} alt="Google logo" className='google'/> Google</button>
           
                       </form>
                   </div>
                    
                   </div>
    );
};

export default Signup;