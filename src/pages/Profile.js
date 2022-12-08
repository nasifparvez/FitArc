import React, {useEffect, useState} from 'react';
import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css'
import './Profile.css';
import { Link } from 'react-router-dom';

//const for fetching and displaying name
const Name = (props) => (
  <p className='text'> Hello {props.record.firstName} {props.record.lastName}</p>
);




export default function Profile() {
  const [date, setDate] = useState(new Date());
  const [records, setRecords] = useState([]);
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

  const [workouts, setWorkouts] = useState([]);
  useEffect(() => {
    async function getRecords(){
      const today = new Date();
      const response = await fetch(`http://localhost:5000/workouts?date=${today.getFullYear()}-${(today.getMonth()+1).toString().padStart(2,"0")}-${today.getDate().toString().padStart(2,"0")}&userId=${localStorage.getItem("userId")}`);

      if (!response.ok){
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const records = await response.json();
      setWorkouts(records);
    }

    getRecords();

    return;
  }, []);

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
  

  //end test
  return (
    <div className="profile">
      <div className='image'>
        {displayName()}
      </div>
      <div className="calendar-container">
        <Calendar onChange={setDate} value={date}/>
      </div>
      <div className="text-center">
        {/* Selected date: {date.toDateString()} */}
        <table>
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
         {workouts.map((workout)=><tr><td>{workout.name}</td></tr>)}
          <tr>
            <th>Weight Today</th>
          </tr>
        </table>
      </div>
    </div>
  );
}