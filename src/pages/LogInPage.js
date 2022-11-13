import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import './LogInPage.css'
import {Link} from 'react-router-dom'


function LogInPage() {
  const navigate = useNavigate();

  return (
    <div>
        <div className='logInBox'>
        <h1 className ='logInTitle'>Log In</h1>
            <form className ='logInForm'>
                <input type= 'text' placeholder = 'Username'></input>
                <br/>
                <input type= 'password' placeholder = 'Password' ></input>
                <br/>
                <button onClick={()=>{navigate("/profile")}}>Log In</button>
            </form>
            <div className='otherOptionsContainer'>
                <p className = 'forgotPassText'>Forgot Password</p>
                <div className ='directToSignupContainer'><p>No Account?</p><button><Link to='/signup'>Sign Up</Link></button></div>
            </div>
        </div>
    </div>
  )
}

export default LogInPage