import React from 'react'
import './AccountSettings.css'
import{ equipment } from '../utils/equipment';
import { useNavigate } from "react-router";
import {useEffect, useState} from 'react'
function AccountSettings() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  useEffect(() => {
    async function getRecords(){
      const response = await fetch(`http://localhost:5000/users/${localStorage.getItem("userId")}`);

      if (!response.ok){
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const records = await response.json();
      setProfile(records);
      console.log(records)
    }

    getRecords();

    return;
  },[]);
  function onChange(e){
    setProfile({...profile,[e.target.name]:e.target.value})
  }
  function checkedOnChange(e){
    if(e.target.checked)
    setProfile({...profile,[e.target.name]:[...profile[e.target.name],e.target.value]})
    else {
      setProfile({...profile,[e.target.name]:profile[e.target.name].filter(a=>a!=e.target.value)})
    }
  }
  return (
    
    <div className='accountSettingsContainer'>
    <h1 className='accountSettingsTitle'>Account Settings</h1>
    <br/>
    <form id='signupForm'onSubmit={(e)=>{
      e.preventDefault();
    }}>
    <input type='text' name='firstName' placeholder='First Name' id='firstNameEntry' value={profile.firstName} onChange={onChange}></input>
    <input type='text' name='lastName'placeholder='Last Name' id='lastNameEntry' value={profile.lastName} onChange={onChange}></input>
    <br/>
    <input type='number' placeholder='Age' id='ageEntry'></input>
    <br/>
    <br/>
    <br/>

    <div className='genderEntry'>
    <label>Gender:</label>
    <label>
          <input
            type="radio"
            value="Male"
            name='gender'
            checked={profile.gender=="Male"}
            onChange={onChange}
          />
          Male
    </label>
    <label>
          <input
            type="radio"
            value="Female"
            name='gender'
            checked={profile.gender=="Female"}
            onChange={onChange}
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
    <select name='goal' value={profile.goal} onChange={onChange}>
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
    <select name='activityLevel' value={profile.activityLevel} onChange={onChange}>
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
        <ul className="equipmentList" >
        {equipment.map(({name}, index) =>{
          return(
            <li key={index}>
              <input
              type="checkbox"
              name='frequentEquipment'              
              value={name}
              checked={profile.frequentEquipment?.includes(name)}
              onChange={checkedOnChange}
              />
              <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
            </li>
          )

        })}
        </ul>
        <button className='signupButton'onClick={async ()=>{
          var response = await fetch("http://localhost:5000/users/update",{body:JSON.stringify(profile), method:"POST", headers:{"content-type":"application/json"}})
          if(!response.ok){
            alert("improper account editing ")
            return
          }
          navigate("/profile")
        }}>Edit Account</button>

    </form>
  </div>
  )
}

export default AccountSettings