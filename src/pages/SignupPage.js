import React from 'react'
import './SignupPage.css'
import{ equipment } from '../utils/equipment';
function SignupPage() {
  return (
    <div className='signupContainer'>
      <h1 className='signupTitle'>Sign Up</h1>
      <br/>
      <form>
      <input type='text' placeholder='First Name' id='firstNameEntry'></input>
      <input type='text' placeholder='Last Name' id='lastNameEntry'></input>
      <br/>
      <input type='number' placeholder='Age' id='ageEntry'></input>
      <br/>
      <input type='email' placeholder='email' id='emailEntry'></input>
      <br/>
      <input type='password' placeholder='password' id='emailEntry'></input>
      <br/>
      <br/>

      <div className='genderEntry'>
      <label>Gender:</label>
      <label>
            <input
              type="radio"
              value="Male"

            />
            Male
      </label>
      <label>
            <input
              type="radio"
              value="Female"

            />
            Female
      </label>
      </div>
      <br/>
      <div className='measurementEntry'>
      <label>Measurement System:</label>
      <label>
            <input
              type="radio"
              value="metric"
            />
            Metric
      </label>
      <label>
            <input
              type="radio"
              value="imperial"
            />
            Imperial
      </label>
      </div>
      <br/>
      <label>Height:</label>
      <input type='text' placeholder='Feet'></input>
      <input type='text' placeholder='Inches'></input>
      <br/>
      <label>Weight:</label>
      <input type='text' placeholder='Pounds'></input>
      <br/>
      <label>Select Body Goal</label>
      <select>
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
      <select>
              <option value="sedentary">Sedentary: Little to No Excercise</option>
              <option value="light">Light: Excercise 1-3x per week</option>
              <option value="moderate">Moderate: Exercise 4-5x per week</option>
              <option value="active">Active: Daily Excercise or Intense Excercise 3-4x per Week</option>
              <option value="very active">Very Active: Intense Excercise </option>
              <option value="extra active">Extra Active: Very Intense Daily Excercise</option>
        </select>
        <br/>
      <label>Enter Allergens (seperate by commas):</label>
      <input type='text'></input>
      <br/>
      <label>Enter Diet:</label>
      <div className='dietOptionSection'>
      <div className="dietOption">
        <input
          type="checkbox"
          id="dietOption"
          name="dietOption"
          value="vegan"
          // checked={isChecked}
          // onChange={handleOnChange}
        />
        Vegan
      </div>
      <div className="dietOption">
        <input
          type="checkbox"
          id="dietOption"
          name="dietOption"
          value="Vegetarian"
          // checked={isChecked}
          // onChange={handleOnChange}
        />
        Vegetarian
      </div>
      <div className="dietOption">
        <input
          type="checkbox"
          id="dietOption"
          name="dietOption"
          value="Lacto-Vegetarian"
          // checked={isChecked}
          // onChange={handleOnChange}
        />
        Lacto-Vegetarian  
      </div>
      <div className="dietOption">
        <input
          type="checkbox"
          id="dietOption"
          name="dietOption"
          value="Ovo-Vegetarian"
          // checked={isChecked}
          // onChange={handleOnChange}
        />
      Ovo-Vegetarian
      </div>
      <div className="dietOption">
        <input
          type="checkbox"
          id="dietOption"
          name="dietOption"
          value="Pescatarian"
          // checked={isChecked}
          // onChange={handleOnChange}
        />
        Pescatarian
        </div>
        <div className="dietOption">
        <input
          type="checkbox"
          id="dietOption"
          name="dietOption"
          value="Ketogenic"
          // checked={isChecked}
          // onChange={handleOnChange}
        />
        Ketogenic
        </div>
        <div className="dietOption">
        <input
          type="checkbox"
          id="dietOption"
          name="dietOption"
          value="Gluten-free"
          // checked={isChecked}
          // onChange={handleOnChange}
        />
        Gluten-free
        </div>
        <div className="dietOption">
        <input
          type="checkbox"
          id="dietOption"
          name="dietOption"
          value="Paleo"
          // checked={isChecked}
          // onChange={handleOnChange}
        />
          Paleo
          </div>
          <div className="dietOption">
        <input
          type="checkbox"
          id="dietOption"
          name="dietOption"
          value="Primal"
          // checked={isChecked}
          // onChange={handleOnChange}
        />
          Primal
          </div>
          <div className="dietOption">
        <input
          type="checkbox"
          id="dietOption"
          name="dietOption"
          value="Whole30"
          // checked={isChecked}
          // onChange={handleOnChange}
        />
          Whole30
          </div>
          <div className="dietOption">
        <input
          type="checkbox"
          id="dietOption"
          name="dietOption"
          value="Low FODMAP"
          // checked={isChecked}
          // onChange={handleOnChange}
        />
          Low FODMAP
          </div>
          </div>
          <br/>
          <label>Frequently Used Equipment:</label>
          <ul className="equipmentList">
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
          <button className='signupButton'>Sign Up</button>

      </form>
    </div>
    )
}

export default SignupPage