import React, { useState } from 'react';
import './App.css'; 
import Log from './components/Log';
import Portal from './components/Portal';



function App() {
    const [currentPage, setCurrentPage] = useState('Log'); 
  
    const handleLogSuccess = () => {
      setCurrentPage('portal');
    };
  
    return (
      <div className="App">
        {currentPage === 'Log' ? (
          <Log onLogSuccess={handleLogSuccess} /> 
        ) : (
          <Portal /> 
        )}
      </div>
    );
  }
  
  export default App;