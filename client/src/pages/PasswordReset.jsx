import axios from "axios";
import React, { useState } from "react";
import {useNavigate, useParams} from 'react-router-dom';
import "../assets/css/PasswordReset.css";

function PasswordReset(props) {
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const navigate = useNavigate();
  const baseURL = "http://localhost:8000/"; 


  const {id} = useParams();

 



  const checkSame = () => {
    if (passwordOne === passwordTwo) {
      alert("Password match")     
      
      let newPassword = {'password':passwordOne};
            // AXIOS
      axios.put(baseURL+ 'passwordResetRequest/'+id, newPassword)
      .this( response => { console.log("PASSWORD RESET PUT", response)})
      .this( error => { console.log("PASSWORD RESET ERROR", error)})

      navigate('/');

    }else{
      alert("Password Does not match")
    }
  };


  return (
    <div>
      <div className="bg-img">
        <div className="content">
          <header>Change Password</header>
          <form onSubmit={checkSame}>
            <div className="section space">
              <span className="fa-solid fa-lock"></span>
              <input
                type="password"
                className="pass"
                required
                placeholder="Password"
                value={passwordOne}
                on
                onChange={(e) => setPasswordOne(e.target.value)}
              />
              {/* <span className="show">SHOW</span> */}
            </div>

            <div className="section space">
              <span className="fa-solid fa-lock"></span>
              <input
                type="password"
                className="pass"
                required
                placeholder="Confirm Password"
                value={passwordTwo}
                onChange={(e) => setPasswordTwo(e.target.value)}
              />
              {/* <span className="show">SHOW</span> */}
            </div>
            <div className="section">
              <input type="submit" value="Change Password" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PasswordReset;
