import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';
import "../assets/css/Signup.css";
import axios from "axios";

function Signup() {

  const [name,setName] = useState('');
  const [number,setNumber] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const navigate = useNavigate();
  const baseURL = "http://localhost:8000/";  
  
  const registerUser = () => {

    const signupData = {
      "name" :name,
      "number" :number,
      "email" :email,
      "password" :password,
    }
    console.log(signupData);

    axios.post(baseURL +'signup/',signupData)
    .then((response) => console.log("SIGNUP POST RESPONSE", response))
    .catch((err) => console.log("Post Error", err));

   navigate('/LandingPage') 
  }

  const loginRedirect = () => {
   navigate('/') 
  }


  return (
    <div>
      <div className="bg-img">
        <div className="content">
          <header>Signup Form</header>
          <form action="#">

            <div className="section ">
              <span className="fa-solid fa-user"></span>
              <input type="text" required placeholder="Enter Name" value={name}  onChange={(e) => setName(e.target.value)} />
            </div>

            <div className="section space">
              <span className="fa-solid fa-user"></span>
              <input type="text" required placeholder="Enter Number" value={number}  onChange={(e) => setNumber(e.target.value)} />
            </div>

            <div className="section space">
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
              {/* <span className="show">SHOW</span> */}
            </div>
            <div className="section">
              <input type="submit" onClick={ () => registerUser()} value="Signup" />
            </div>
            <div className="section space">
              <input type="submit" onClick={() => loginRedirect()}  value="Already a user?" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
