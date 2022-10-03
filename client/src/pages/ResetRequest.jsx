import axios from "axios";
import React, { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/ResetRequest.css";

function ResetRequest() {
  const [email, setEmail] = useState("");
  const [data,setData] = useState([]);
  const [id,setId] = useState();
  const navigate = useNavigate();
  const baseURL = "http://localhost:8000/";


  const getMailId = () => {

    data.map( (d) => {
      if(d.email === email){
        setId(d._id);
        requestReset(d._id);
      }
    });   
  }

  const requestReset = (id) => {
    let idData = { "_id": id, "email":email}
    axios.post(baseURL+ 'requestReset', idData)
    .then( response => { console.log("RESET POST RES", response)})
    .catch( error => { console.log("RESET POST ERROR",error)})
  };


  

  
   

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
          <header>Forgot Password</header>
          <form>
            <div className="section space">
              <span className="fa-solid fa-user"></span>
              <input
                type="text"
                required
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="section space">
              <button onClick={()=>{getMailId()}}>Reset Pssword</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default ResetRequest;
