/*
import React, { useState } from 'react';
import './App.css'; 
import Log from './Components/Log'; 
import Portal from './Components/Portal';
*/
import React from 'react';
import Home from './Components/Home';

function App() {

   /*   const [isLoggedIn, setIsLoggedIn] = useState(false); 

      const handleLoginSuccess = () => {
        setIsLoggedIn(true); 
      }

  return ( 
 
    <div className="App">

      <div className="portal-container">
      {isLoggedIn ? (
      <Portal /> 
    ) : (
      <Log onLoginSuccess={handleLoginSuccess} /> 
    )}
      </div>
    
  </div>
*/

return(
   

  <Home/>

  );
}

export default App
