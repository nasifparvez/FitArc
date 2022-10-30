import React, { useEffect, useState } from 'react';
import {excerciseOptions, FetchDataExcercise} from '../utils/FetchDataExcercise'
import ExcerciseCardComponent from "../components/ExcerciseCardComponent";
import './Fitness.css';
import EditEquipmentWindow from '../components/EditEquipmentWindow';
import FitnessEquipmentList from '../components/FitnessEquipmentList';
import FitnessMuscleList from '../components/FitnessMuscleList';

export default function Fitness() {
  const [excercisesArray, setexcercisesArray] = useState([]);
  const [buttonPopup, setButtonPopup] = useState(false);
  const [excerciseUserInfo, setexcerciseUserInfo] = useState(null);
  const [selectedEquipments, setSelectedEquipments] = useState([]);
  const [selectedMuscle, setselectedMuscle] = useState([]);
  const [currentExcerciseInput, setCurrentExcerciseInput] =useState("");
  const [currentMuscleInput, setCurrentMuscleInput] =useState("");
  const [setsInput, setSetsInput] = useState("");
  const [repsInput, setRepsInput] = useState("");
  const [timeInput, setTimeInput] = useState("");

  const [inputworkoutExcercise, setinputworkoutExcercise] = useState([]);
  const[selectedId, setSelectedID] = useState(null);


  const handleSubmit = (event) => {
    event.preventDefault();
    const excerciseNameFormatted = currentExcerciseInput.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
    const muscleNameFormatted = currentMuscleInput.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());

    if(selectedId==null){
      const payload = {
        id: Math.random().toString(),
        name:excerciseNameFormatted,
        time:timeInput,
        reps:repsInput,
        sets:setsInput,
        muscle:muscleNameFormatted
      }
      setinputworkoutExcercise([...inputworkoutExcercise, payload])
    }
    else{
      setinputworkoutExcercise(inputworkoutExcercise.map((excercise)=> {
        if(excercise.id==selectedId){
          return {
            id:excercise.id,
            name:excerciseNameFormatted,
            time:timeInput,
            reps:repsInput,
            sets:setsInput,
            muscle:muscleNameFormatted
          }
        }else{
          return excercise;
        }
      }));
      setSelectedID(null);
    }
    setCurrentExcerciseInput("")
    setCurrentMuscleInput("")
    setSetsInput("")
    setRepsInput("")
    setTimeInput("")

  }

  const handleChangeMuscle = (muscleName) => {
    const clicked = selectedMuscle.includes(muscleName);
    console.log('this is: '+ clicked,muscleName );

    if (!clicked) {
      setselectedMuscle(
        [...selectedMuscle, muscleName],
      );
    }
    else {
      setselectedMuscle(
        selectedMuscle.filter((e) => e !== muscleName),
      );
    }
  };
  
  const handleChangeEquipment = (equipmentName) => {
    //Does the selected equipment include the click equipment item
    const clicked = selectedEquipments.includes(equipmentName);
    console.log('this is: '+ clicked,equipmentName );

    if (!clicked) {
      setSelectedEquipments(
        [...selectedEquipments, equipmentName],
      );
    }
    else {
      setSelectedEquipments(
        selectedEquipments.filter((e) => e !== equipmentName),
      );
    }

  };

  return (
    <div className="fitnessContainer">
      <div className='leftSection'>
      <h1>Your Workouts</h1>
      <div className='muscleGroupSection'>
        <h2>What Muscle Group(s) Do You Want to Focus On Today</h2>
        <FitnessMuscleList
        handleChangeMuscle={handleChangeMuscle}
        selectedMuscles={selectedMuscle}
        />
        </div>
        <div className='equipementSection'>
          <div className='equipmentHeader'>
            <h2>Frequent Equipment Used</h2>
            <button className='moreButton' onClick={() => setButtonPopup(true)}>|||||</button>
            <EditEquipmentWindow trigger={buttonPopup}setTrigger={setButtonPopup}> 
              <h3>Choose Equipment</h3>
              <FitnessEquipmentList
                handleChangeEquipment={handleChangeEquipment}
                selectedEquipments={selectedEquipments}
                />
            </EditEquipmentWindow>
          </div>
          <ul className='equipmentList' id='equipmentList'>
          {selectedEquipments.map((item,i) => 
              <li key={i}>{item}</li>
            )}
          </ul>
        </div>
        <button onClick={() => generateExcercises()}>Submit</button>
        <div className='recommendedWorkoutSection'>
        <br/>
          <h2>Recommended Workouts For Today</h2>
          <br/>
          <br/>
          <div className='cardSection'>
            {excercisesArray.map((excercise)=>
              <ExcerciseCardComponent
              className='excerciseCard'
              onClick={()=> {
                setCurrentExcerciseInput(excercise.name);
                setCurrentMuscleInput(excercise.bodyPart);
              }}
              key={excercise.name}
              img={excercise.gifUrl}
              title={excercise.name}
              />
            )
            }
          </div>
        </div>
        </div>
        <div className='rightSection'>
      <div className='excerciseEntrySection'>
          <h2>Excercise Entry</h2>
          {selectedId!=null&&(<div>{inputworkoutExcercise.find((excercise)=>excercise.id==selectedId).name}</div>)}
          <form onSubmit={handleSubmit} id='excerciseForm'>
            <label>Muscle Group
            <select value={currentMuscleInput} onChange={(e)=>setCurrentMuscleInput(e.target.value)}  className='excerciseFormInput'>
              <option disabled selected value> -- select an option -- </option>
              <option value="back">Back</option>
              <option value="cardio">Cardio</option>
              <option value="chest">Chest</option>
              <option value="lower arms">Lower Arms</option>
              <option value="lower legs">Lower Legs</option>
              <option value="neck">Neck</option>
              <option value="shoulders">Shoulders</option>
              <option value="upper arms">Upper Arms</option>
              <option value="upper legs">Upper Legs</option>
              <option value="waist">Waist</option>
            </select>
          </label>
          <br/>
          <br/>
          <label>Enter Name of Excercise:
            <input 
              type="text" 
              name="excerciseName"
              className='excerciseFormInput' 
              value={currentExcerciseInput }
              onChange={(e)=>setCurrentExcerciseInput(e.target.value)}
            />
            </label>
            <br/>
            <label>Number of Sets:
            <input 
              type='number'
              name="setsAmount"
              className='excerciseFormInput'
              onChange={(e)=>setSetsInput(e.target.value)}
              value={setsInput}
            />
            </label>
            <br/>

            <label>Number of Reps per Set:
            <input 
              type='number'
              name="repsAmount" 
              className='excerciseFormInput'
              onChange={(e)=>setRepsInput(e.target.value)}
              value={repsInput}
            />
            </label>
            <br/>

            <label>Time Spent (in minutes) per Set:
            <input 
              type='number'
              name="timeAmount"
              className='excerciseFormInput'
              onChange={(e)=>setTimeInput(e.target.value)}
              value={timeInput}
            />
            </label>
            <button className='submitExcercise'>Submit To Workout</button>
          </form>
          
      </div>
      <div className='workoutSection'>
          <h2>Workout</h2>
          {
          inputworkoutExcercise.map((excercise)=>
          <div className = 'excerciseInWorkoutListItem' style={{backgroundColor:selectedId==excercise.id?'yellow':undefined}}>
            <div className='buttonWorkoutContainer'>
            <h3>{excercise.name}</h3>
            <div className='buttonsOnly'>
            <button className='editButton' 
            onClick={()=>{
                 setCurrentExcerciseInput(excercise.name)
                setCurrentMuscleInput(excercise.muscle)
                setSetsInput(excercise.sets)
                setRepsInput(excercise.reps)
              setTimeInput(excercise.time)
              setSelectedID(excercise.id)
            }}>Edit</button>
            <button className='deleteButton' onClick={()=> {setinputworkoutExcercise(inputworkoutExcercise.filter((currentExcercise)=>currentExcercise.id!=excercise.id))}}>Delete</button>
            </div>
            </div>
            <h4>Muscle Targeted: {excercise.muscle}</h4>
            <div className='excerciseInputDetails'>
            <p>Sets: {excercise.sets}</p>
            <p>Reps: {excercise.reps}</p>
            <p>Time Spent:{excercise.time}</p>
            </div>

          </div>
          )
          }
          <br/>
        

        </div> 
      </div>
      </div>
  )
;

//Generates Excercises Based on Both muscle group and equipment
async function generateExcercises() {
    let excercises = [];
    for (let i = 0; i < selectedMuscle.length; i++) {
      var muscleString = selectedMuscle[i];
      if(muscleString.includes(" ")){//if muscle group has two words insert '%20' so api call is successful
        muscleString = muscleString.replace(/ /g,"%20");
      }
      for(let k = 0; k < selectedEquipments.length; k++){
      let response = await fetch(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${muscleString.toLowerCase()}`, excerciseOptions)
      let data = await response.json()
      console.log(data)
          var equipmentString = selectedEquipments[k]; 
          setexcerciseUserInfo(data);
          let equipmentfilter;
          equipmentfilter= data.filter(apiResults => apiResults['equipment'] == equipmentString);
          let objectArraytoArray = Object.values(equipmentfilter);
          for(const object of objectArraytoArray){
            if(!excercises.find((excercise)=>excercise.id==object.id)){
              excercises.push(object)
            }
          }
        }
    }
    setexcercisesArray(excercises);
    console.log(excercises)
    return excercises;
}
}

