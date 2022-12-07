import React from 'react'
import './AccountSettings.css'
import{ equipment } from '../utils/equipment';
import { useNavigate } from "react-router";
function AccountSettings() {
  const navigate = useNavigate();

  return (    
    <div className='accountSettingsContainer'>
    <h1 className='accountSettingsTitle'>Account Settings</h1>
    <br/>
    <form id='signupForm'onSubmit={(e)=>{
      e.preventDefault();
    }}>
    <input type='text' name='firstName' placeholder='First Name' id='firstNameEntry'></input>
    <input type='text' name='lastName'placeholder='Last Name' id='lastNameEntry'></input>
    <br/>
    <input type='number' placeholder='Age' id='ageEntry'></input>
    <br/>
    <input type='email' name='email' placeholder='email' id='emailEntry'></input>
    <br/>
    <input type='password' placeholder='password' name='password' id='emailEntry'></input>
    <br/>
    <br/>

    <div className='genderEntry'>
    <label>Gender:</label>
    <label>
          <input
            type="radio"
            value="Male"
            name='gender'
          />
          Male
    </label>
    <label>
          <input
            type="radio"
            value="Female"
            name='gender'
          />
          Female
    </label>
    </div>
    <br/>
    <br/>
    <label>Height:</label>
    <input type='text' placeholder='Feet' name='feetHeight'></input>
    <input type='text' placeholder='Inches' name='inchesHeight'></input>
    <br/>
    <label>Weight:</label>
    <input type='text' placeholder='Pounds' name='weight'></input>
    <br/>
    <label>Select Body Goal</label>
    <select name='goal'>
            <option value="gain 1kg a week">Gain 1kg weekly</option>
            <option value="gain .5kg a week">Gain 0.5 kg weekly</option>
            <option value="gain .25kg a week">Gain 0.25 kg weekly</option>
            <option value="maintain">Maintain</option>
            <option value="lose .25kg a week">Lose 0.25 kg weekly</option>
            <option value="lose .5kg a week">Lose 0.5 kg weekly</option>
            <option value="lose 1kg a week">Lose 1 kg weekly</option>
      </select>
      <br/>
    <label>Select Activity Level</label>
    <select name='activityLevel'>
            <option value="sedentary">Sedentary: Little to No Excercise</option>
            <option value="light">Light: Excercise 1-3x per week</option>
            <option value="moderate">Moderate: Exercise 4-5x per week</option>
            <option value="active">Active: Daily Excercise or Intense Excercise 3-4x per Week</option>
            <option value="very active">Very Active: Intense Excercise </option>
            <option value="extra active">Extra Active: Very Intense Daily Excercise</option>
      </select>
      <br/>
    <label>Enter Allergens (seperate by commas):</label>
    <input type='text' name='allergens'></input>
    <br/>
    <label>Enter Diet:</label>
    <div className='dietOptionSection'>
    <div className="dietOption">
      <input
        type="checkbox"
        id="dietOption"
        name="dietOption"
        value="vegan"
      />
      Vegan
    </div>
    <div className="dietOption">
      <input
        type="checkbox"
        id="dietOption"
        name="dietOption"
        value="Vegetarian"
      />
      Vegetarian
    </div>
    <div className="dietOption">
      <input
        type="checkbox"
        id="dietOption"
        name="dietOption"
        value="Lacto-Vegetarian"
      />
      Lacto-Vegetarian  
    </div>
    <div className="dietOption">
      <input
        type="checkbox"
        id="dietOption"
        name="dietOption"
        value="Ovo-Vegetarian"
      />
    Ovo-Vegetarian
    </div>
    <div className="dietOption">
      <input
        type="checkbox"
        id="dietOption"
        name="dietOption"
        value="Pescatarian"
      />
      Pescatarian
      </div>
      <div className="dietOption">
      <input
        type="checkbox"
        id="dietOption"
        name="dietOption"
        value="Ketogenic"
      />
      Ketogenic
      </div>
      <div className="dietOption">
      <input
        type="checkbox"
        id="dietOption"
        name="dietOption"
        value="Gluten-free"
      />
      Gluten-free
      </div>
      <div className="dietOption">
      <input
        type="checkbox"
        id="dietOption"
        name="dietOption"
        value="Paleo"
      />
        Paleo
        </div>
        <div className="dietOption">
      <input
        type="checkbox"
        id="dietOption"
        name="dietOption"
        value="Primal"
      />
        Primal
        </div>
        <div className="dietOption">
      <input
        type="checkbox"
        id="dietOption"
        name="dietOption"
        value="Whole30"
      />
        Whole30
        </div>
        <div className="dietOption">
      <input
        type="checkbox"
        id="dietOption"
        name="dietOption"
        value="Low FODMAP"
      />
        Low FODMAP
        </div>
        </div>
        <br/>
        <label>Frequently Used Equipment:</label>
        <ul className="equipmentList" name='frequentEquipment'>
        {equipment.map(({name}, index) =>{
          return(
            <li key={index}>
              <input
              type="checkbox"
              name={name}
              value={name}
              />
              <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
            </li>
          )

        })}
        </ul>
        <button className='signupButton'onClick={async ()=>{
          var form = document.getElementById("accountSettingsTitle")
          var formData = new FormData(form)
          var response = await fetch("http://localhost:5000/users/add",{body:new URLSearchParams(formData).toString(), method:"POST", headers:{"content-type":"application/x-www-form-urlencoded"}})
          if(!response.ok){
            alert("improper account editting ")
            return
          }
          navigate("/profile")
        }}>Sign Up</button>

    </form>
  </div>
  )
}

export default AccountSettings