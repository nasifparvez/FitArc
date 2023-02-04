import React, {useEffect, useState} from 'react';
import Calendar from 'react-calendar';
import './Profile.css';
import {Link} from 'react-router-dom'



//const for fetching and displaying name
const Name = (props) => (
  <div>
    <p className='textName'> Hello {props.record.firstName} {props.record.lastName} </p>
    <br></br>
    <p className='text'><b>Goal</b>: {props.record.goal}</p>
    <p>Original Weight: {props.record.weight}</p>
  </div>
  
  
);

//const for fetching and displaying workouts
//&#x2022; adds bullet point
const Workout = (props) => (
  <tr>
    <td>&#x2022;   {props.workout.name}<td classname='setText'> - <i>{props.workout.sets}</i> sets of <i>{props.workout.reps}</i> reps</td></td>
  </tr>
);

//const for fetching and displaying meals
//&#x2022; adds bullet point
const Meals = (props) => (
  <tr>
    <td>&#x2022;   {props.meals.name}
      <td classname='setText'> - Cals: <i>{props.meals.calories}</i> P: <i>{props.meals.protein}</i>g C: <i>{props.meals.carbs}</i>g F: <i>{props.meals.fat}g</i></td>
    </td>
  </tr>
);



export default function Profile() {
  const [date, setDate] = useState(new Date());
  const [records, setRecords] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [meals, setMeals] = useState([]);
  const [filterThings, setFilter] = useState([]);

  const filtered = React.useMemo(() => {
    return workouts.filter(workout => {
      return filterThings.length > 0 ? workout.date === date : true;
    })
  }, [filterThings, workouts]);

  // const selectedDate =  useState(new Date());
  // test
  //This method fetches the individual user from the database
  useEffect(() => {
    async function getRecords(){
      const response = await fetch(`http://localhost:5000/users/${localStorage.getItem("userId")}`);

      if (!response.ok){
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const records = await response.json();
      
      setRecords(records);
    }

    getRecords();

    return;
  }, [records.length]);

  // const selectedDate = (clickedDay) => {console.log(clickedDay)};
  //fetch workouts
  useEffect(() => {
    async function getWorkouts(){
      const today = new Date();
      // const response = await fetch(`http://localhost:5000/workouts?date=${today.getFullYear()}-${(today.getMonth()+1).toString().padStart(2,"0")}-${today.getDate().toString().padStart(2,"0")}&userId=${localStorage.getItem("userId")}`);
      const response = await fetch(`http://localhost:5000/workouts/${localStorage.getItem("userId")}`);
      if (!response.ok){
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const workouts = await response.json();
      // const filtered  = workouts.filter((e) => e.date === date);
      
      // console.log("these are the filtered workouts", filtered);
      setWorkouts(workouts);
    }

    getWorkouts();

    return
  }, [workouts.length]);


  //fetch meals
  useEffect(() => {
    async function getMeals(){
      const today = new Date();
      const response = await fetch(`http://localhost:5000/meals?date=${today.getFullYear()}-${(today.getMonth()+1).toString().padStart(2,"0")}-${today.getDate().toString().padStart(2,"0")}&userId=${localStorage.getItem("userId")}`);

      if (!response.ok){
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const meals = await response.json();
      setMeals(meals);
    }

    getMeals();
    
    return
  }, [meals.length]);


  //This method will delete a record
  async function deleteRecord(id){
    await fetch(`http://localhost:5000/${id}`, {
      method: "DELETE"
    });

    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
  }

  //this method will display the name
  function displayName(){
      return (
        <Name
          record={records}
          deleteRecord={() => deleteRecord(records._id)}
          key={records._id}
        />
      );
  }

  //this method will display the workouts
  function displayWorkout(date){
    return workouts.filter((e) => e.date === date).map(workout=> {
      return (
        <Workout
          workout={workout}
        />
      );
    });
  }

  //this method will display the meals
  function displayMeals(date){
    return meals.filter((e) => e.date === date).map(meal => {
      return (
        <Meals
          meals={meal}
        />
      );
    });
  }
  


  //end test
  return (
    <div class="container">
      <div class="Calendar">
        <Calendar 
          onChange={setDate}
          // onChange={filter}
          value={date}
          minDate={new Date(2022, 10, 30)}
          maxDate={new Date()}
          />
      </div>
      <div class="Journal"><table>
            <tr>
              <th>{date.toISOString().slice(0, 10)} Journal</th>
            </tr>
            <tr>
              <th>Food Eaten <Link to='/nutrition' className="linkPlus">+</Link></th>
            </tr>
            <div className="tableScroll">
              {displayMeals(date.toISOString().slice(0,10))}
            </div>
            
            <tr>
              <th>Exercises Completed <Link to='/fitness' className="linkPlus">+</Link></th>
            </tr>
            <div className="tableScroll">
              {displayWorkout(date.toISOString().slice(0, 10))}
            </div>
            
            <tr>
              <th>Weight Today</th>
            </tr>
          </table></div>
      <div class="Avatar"><img src='https://mir-s3-cdn-cf.behance.net/project_modules/disp/96be2232163929.567197ac6fb64.png'/></div>
      <div class="Name">{displayName()}</div>
    </div>
  );
}