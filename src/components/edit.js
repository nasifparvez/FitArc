import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
const {REACT_APP_BASE_URL} =  process.env

export default function Edit() {
 const [form, setForm] = useState({
   name: "",
   email: "",
   level: "",
   records: [],
 });
 const params = useParams();
 const navigate = useNavigate();
 
 useEffect(() => {
   async function fetchData() {
     const id = params.id.toString();
     const response = await fetch(`${REACT_APP_BASE_URL}users/${params.id.toString()}`);
 
     if (!response.ok) {
       const message = `An error has occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const record = await response.json();
     if (!record) {
       window.alert(`Record with id ${id} not found`);
       navigate("/");
       return;
     }
 
     setForm(record);
   }
 
   fetchData();
 
   return;
 }, [params.id, navigate]);
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 async function onSubmit(e) {
   e.preventDefault();
   const editedPerson = {
     name: form.name,
     email: form.email,
     level: form.level,
   };
 
   // This will send a post request to update the data in the database.
   await fetch(`${REACT_APP_BASE_URL}update/${params.id}`, {
     method: "POST",
     body: JSON.stringify(editedPerson),
     headers: {
       'Content-Type': 'application/json'
     },
   });
 
   navigate("/");
 }
 
 // This following section will display the form that takes input from the user to update the data.
 return (
   <div>
     <h3>Update Record</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="name">Name: </label>
         <input
           type="text"
           className="form-control"
           id="name"
           value={form.name}
           onChange={(e) => updateForm({ name: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="email">Email: </label>
         <input
           type="text"
           className="form-control"
           id="email"
           value={form.email}
           onChange={(e) => updateForm({ email: e.target.value })}
         />
       </div>
       <div className="form-group">
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="positionOptions"
             id="levelBeginner"
             value="Beginner"
             checked={form.level === "Beginner"}
             onChange={(e) => updateForm({ level: e.target.value })}
           />
           <label htmlFor="levelBeginner" className="form-check-label">Beginner</label>
         </div>
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="positionOptions"
             id="LevelIntermediate"
             value="Intermediate"
             checked={form.level === "Intermediate"}
             onChange={(e) => updateForm({ level: e.target.value })}
           />
           <label htmlFor="LevelIntermediate" className="form-check-label">Intermediate</label>
         </div>
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="positionOptions"
             id="levelExpert"
             value="Expert"
             checked={form.level === "Expert"}
             onChange={(e) => updateForm({ level: e.target.value })}
           />
           <label htmlFor="levelExpert" className="form-check-label">Expert</label>
       </div>
       </div>
       <br />
 
       <div className="form-group">
         <input
           type="submit"
           value="Update Record"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}