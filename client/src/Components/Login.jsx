import { useState } from "react";
import './style.css';

export default function Login(){
  const[inputs, setInputs] = useState({});

  const handleChange =  (e) => {
    const name = e.target.name;
    const value = e.target.password;
    setInputs(values => ({...values, [name]: value}))
  }

   const handleSubmit = (e) => {
    e.preventDefault();
    alert(inputs);
   }

    return (
        <div>
            <div className="image">
                <img src="./images/TradamLogo.png"/>
            </div>
            
        <div className="form">
            <h3>Login</h3>
            <form onSubmit={handleSubmit} >
              <input type="email" name="email" placeholder="Email" 
              value={inputs.email || ""} onchange={handleChange}/>

              <input type="password" placeholder="Password" name="password"
              value={inputs.password || ""} onchange={handleChange}/>

                <button><input type="submit" value="Login"/></button>

                <p>Don't have an account? <a href="">Sigh up</a></p>
            </form>
        </div>
        </div>         
    );
}
