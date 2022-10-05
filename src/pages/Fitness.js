import React, { useEffect, useState } from 'react' 
import {excerciseOptions, FetchDataExcercise} from '../utils/FetchDataExcercise'
import './Fitness.css'

export default function Fitness() {
  const [search, setSearch] = useState('')

  const handleSearch = async () =>{
    if(search){
      const excercisesData = await FetchDataExcercise ('https://exercisedb.p.rapidapi.com/exercises/bodyPartList',excerciseOptions);
      console.log(excercisesData);
    }
  }

  return (
    <div className="fitness">
      <div className='titleContainer'>
          <p className='fitnessPageTitle'>Your Workouts</p>
      </div>
      <div className='bodyPartGroupSection'>
          <p className='subtitle'>What Body Part(s) Do You Want To Focus On Today?</p>
          <div className='buttonSection'>
            <div className='buttonContainer'><button type="button" className='bodyPartButton'>Back</button></div>
            <div className='buttonContainer'><button type="button" className='bodyPartButton'>Cardio</button></div>
            <div className='buttonContainer'><button type="button" className='bodyPartButton'>Chest</button></div>
            <div className='buttonContainer'><button type="button" className='bodyPartButton'>Lower Arms</button></div>
            <div className='buttonContainer'><button type="button" className='bodyPartButton'>Lower Legs</button></div>
            <div className='buttonContainer'><button type="button" className='bodyPartButton'>Shoulders</button></div>
            <div className='buttonContainer'><button type="button" className='bodyPartButton'>Upper Arms</button></div>
            <div className='buttonContainer'><button type="button" className='bodyPartButton'>Upper Legs</button></div>
            <div className='buttonContainer'><button type="button" className='bodyPartButton'>Waist</button></div>
          </div>
      </div>
      <div className='equipmentSection'>
          <p className='subtitle'>What Equipment Do You Have Access To Today?</p>
          <select className='equipmentList'>
            <option value="assisted">Assisted</option>
            <option value="band">Band</option>
            <option value="barbell">Barbell</option>
            <option value="body weight">Body Weight</option>
            <option value="bosu ball">Bosu Ball</option>
            <option value="cable">Cable</option>
            <option value="dumbbell">Dumbbell</option>
            <option value="elliptical machine">Elliptical Machine</option>
            <option value="ez barbell">EZ barbell</option>
            <option value="hammer">Hammer</option>
            <option value="kettlebell">Kettlebell</option>
            <option value="leverage machine">Leverage Machine</option>
            <option value="medicine ball">Medicine Ball</option>
            <option value="olympic barbell">Olympic Barbell</option>
            <option value="resistance band">Resistance Band</option>
            <option value="roller">Roller</option>
            <option value="rope">Rope</option>
            <option value="skierg machine">Skierg Machine</option>
            <option value="sled machine">Sled Machine</option>
            <option value="smith machine">Smith Machine</option>
            <option value="stability ball">Stability Ball</option>
            <option value="stationary bike">Stationary Bike</option>
            <option value="stepmill machine">Stepmill Machine</option>
            <option value="tire">Tire</option>
            <option value="trap bar">Trap Bar</option>
            <option value="upper body ergometer">Upper Body Ergometer</option>
            <option value="weighted">Weighted</option>
            <option value="wheel roller">Wheel Roller</option>
          </select>
      </div>
      <div className='workoutRecommendationSection'>
        
      </div>
    </div>
  );
}
