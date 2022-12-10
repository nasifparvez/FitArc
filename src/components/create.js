import React, { useState } from "react";
import { useNavigate } from "react-router";
 
const {REACT_APP_BASE_URL} =  process.env


export default function Create() {
 const [form, setForm] = useState({
   name: "",
   email: "",
   level: "",
 });
 const navigate = useNavigate();
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 // This function will handle the submission.
 async function onSubmit(e) {
   e.preventDefault();
 
   // When a post request is sent to the create url, we'll add a new record to the database.
   const newPerson = { ...form };
 
   await fetch(`${REACT_APP_BASE_URL}users/add`, {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newPerson),
   })
   .catch(error => {
     window.alert(error);
     return;
   });
 
   setForm({ name: "", email: "", level: "" });
   navigate("/");
 }
 
 // This following section will display the form that takes the input from the user.
 return (
   <div>
     <h3>Create New Record</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="name">Name</label>
         <input
           type="text"
           className="form-control"
           id="name"
           value={form.name}
           onChange={(e) => updateForm({ name: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="position">Email</label>
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
           <label htmlFor="levelIntermediate" className="form-check-label">Intermediate</label>
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
       <div className="form-group">
         <input
           type="submit"
           value="Create person"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}