import React from 'react'
import './ExcerciseCardComponent.css'

function ExcerciseCardComponent(props) {
  var name = props.title;
  const words = name.split(" ");
  return (
    <div className='excerciseCardContainer'>
      <button className='addbutton' onClick={props.onClick }>+</button>
      <img src={props.img} className='excerciseImg' alt='excerciseGif'/>
      <h2 className='excerciseTitle'>{words.map((word) => { 
    return word[0].toUpperCase() + word.substring(1); 
}).join(" ")}</h2>
    </div>
  )
}

export default ExcerciseCardComponent