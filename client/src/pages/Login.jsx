import axios from "axios";
import React,{useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';
import "../assets/css/Login.css";

function Login() {
  
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [data,setData] = useState([]);
  const navigate = useNavigate();
  const baseURL = "http://localhost:8000/"; 
  console.log( email + password); 




  const passwordCheckAndProceedings = () => {
    data.map( (d) => {
      if(d.email === email && d.password === password){
        console.log("yes");
        navigate('/LandingPage');
      }
    })
  }
  

  

  

  const signupRedirect = () => {
    navigate('/Signup')
  }

  const resetRequestRedirect = () => {
    navigate('/ResetRequest')
  }


  useEffect( ()=> {
    axios.get(baseURL + 'api/data/')
    .then( (response) => { 
      setData(response.data.data);
      
    })
    .catch( (err) => {console.log("FETCH ERROR", err)})    
  
  },[])





  return (
    <div>
      <div className="bg-img">
        <div className="content">
          <header>Login Form</header>
          <form>

        
            <div className="section ">
              <span className="fa-solid fa-user"></span>
              <input type="text" required placeholder="Enter Email" value={email}  onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className="section space">
              <span className="fa-solid fa-lock"></span>
              <input
                type="password"
                className="pass"
                required
                placeholder="Password"
                value={password}  onChange={(e) => setPassword(e.target.value)}
              />
              <span className="show">SHOW</span>
            </div>
            <div className="section">
              <button  onClick={() => passwordCheckAndProceedings()} >LOGIN</button>
            </div>
            <div className="section space">
              <input type="submit" onClick={() => signupRedirect()} value="New User" />
            </div>
            <div className="section space">
              <input type="submit" onClick={() => resetRequestRedirect()} value="Forgot Password?" />
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
