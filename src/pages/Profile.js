import React, {useEffect, useState} from 'react';
import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css'
import './Profile.css';
// import avatar from './avatar.png';


//const for fetching and displaying name
const Name = (props) => (
  <p className='text'> Hello {props.record.firstName} {props.record.lastName} <b>Goal</b>: {props.record.goal}</p>
  
);

//const for fetching and displaying workouts
const Workout = (props) => (
  <tr><td>{props.workout.name}</td></tr>
);


export default function Profile() {
  const [date, setDate] = useState(new Date());
  const [records, setRecords] = useState([]);
  const [workouts, setWorkouts] = useState([]);
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

  useEffect(() => {
    async function getWorkouts(){
      const response = await fetch('http://localhost:5000/workouts/');

      if (!response.ok){
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const workouts = await response.json();
      setWorkouts(workouts);
    }

    getWorkouts();

    return
  }, [workouts.length]);

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
  function displayWorkout(){
    return workouts.map((workout) => {
      return (
        <Workout
          workout={workout}
        />
      );
    });
  }
  

  //end test
  return (
    <div class="container">
      <div class="Calendar"><Calendar onChange={setDate} value={date}/></div>
      <div class="Journal"><table>
            <tr>
              <th>{date.toDateString()} Journal</th>
            </tr>
            <tr>
              <th>Food Eaten</th>
            </tr>
            <tr>
              <td>Pizza</td>
            </tr>
            <tr>
              <td>Pizza</td>
            </tr>
            <tr>
              <td>Pizza</td>
            </tr>
            <tr>
              <th>Exercises Completed</th>
            </tr>
            {displayWorkout()}
            <tr>
              <th>Weight Today</th>
            </tr>
          </table></div>
      <div class="Avatar"><img src='https://mir-s3-cdn-cf.behance.net/project_modules/disp/96be2232163929.567197ac6fb64.png'/></div>
      <div class="Name">{displayName()}</div>
    </div>
    // <div>
    //   <div class="split left">
    //     <div class="centered">
    //       <img src='https://mir-s3-cdn-cf.behance.net/project_modules/disp/96be2232163929.567197ac6fb64.png'/>
    //       {displayName()}
    //     </div>
    //   </div>

    //   <div class="split right">
    //     <div class="centered">
          // <table>
          //   <tr>
          //     <th>{date.toDateString()} Journal</th>
          //   </tr>
          //   <tr>
          //     <th>Food Eaten</th>
          //   </tr>
          //   <tr>
          //     <td>Pizza</td>
          //   </tr>
          //   <tr>
          //     <td>Pizza</td>
          //   </tr>
          //   <tr>
          //     <td>Pizza</td>
          //   </tr>
          //   <tr>
          //     <th>Exercises Completed</th>
          //   </tr>
          //   {displayWorkout()}
          //   <tr>
          //     <th>Weight Today</th>
          //   </tr>
          // </table>
    //     </div>
    //   </div>
    // </div>
    

    // <div className="profile">
    //   <div className='image'>
    //     {/* {displayName()} */}
    //   </div>
    //   <div>{displayName()}</div>
    //   <div className="calendar-container">
    //     <Calendar onChange={setDate} value={date}/>
    //   </div>
    //   <div className="text-center">
    //     {/* Selected date: {date.toDateString()} */}
        // <table>
        //   <tr>
        //     <th>{date.toDateString()} Journal</th>
        //   </tr>
        //   <tr>
        //     <th>Food Eaten</th>
        //   </tr>
        //   <tr>
        //     <td>Pizza</td>
        //   </tr>
        //   <tr>
        //     <td>Pizza</td>
        //   </tr>
        //   <tr>
        //     <td>Pizza</td>
        //   </tr>
        //   <tr>
        //     <th>Exercises Completed</th>
        //   </tr>
        //   {displayWorkout()}
        //   {/* <tr>
        //     <td>Pushups</td>
        //   </tr><tr>
        //     <td>Pushups</td>
        //   </tr><tr>
        //     <td>Pushup</td>
        //   </tr> */}
        //   <tr>
        //     <th>Weight Today</th>
        //   </tr>
        // </table>
    //   </div>
    // </div>
  );
}