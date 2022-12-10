import React, {useState} from 'react'
import { json, useNavigate } from 'react-router-dom'
import './LogInPage.css'
import {Link} from 'react-router-dom'



function LogInPage() {
  const navigate = useNavigate();
const [email, setEmail]=useState("");
const [password, setPassword]=useState("");

  return (
    <div>
        <div className='logInBox'>
        <h1 className ='logInTitle'>Log In</h1>
            <div className ='logInForm'>
                <input type= 'text' name = 'email'placeholder = 'email' value={email} onChange={(e)=>setEmail(e.target.value)}></input>
                <br/>
                <input type= 'password'name = 'password' placeholder = 'Password' value={password} onChange={(e)=>setPassword(e.target.value)}></input>
                <br/>
                <button onClick={async ()=>{
                  const response = await fetch(`${process.env.REACT_APP_BASE_URL}users/login`,{method:"POST", body:JSON.stringify({email,password}),headers:{"content-type": "application/json"}})
                  //Makes sure user exists or has put in the correct information
                  if(!response.ok){
                    alert("Bad log in")
                    return;
                  }
                  var user = await response.json();
                  localStorage.setItem("firstName", user.firstName)
                  localStorage.setItem("userId", user._id)
                  console.log(user)
                  //Redirects to users profile page
                  navigate("/profile")}}>Log In</button>
            </div>
            <div className='otherOptionsContainer'>
                <p className = 'forgotPassText'>Forgot Password</p>
                <div className ='directToSignupContainer'><p>No Account?</p><button><Link to='/signup'>Sign Up</Link></button></div>
            </div>
        </div>
    </div>
  )
}

export default LogInPage