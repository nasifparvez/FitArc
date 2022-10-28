import { render } from '@testing-library/react';
import React from 'react'

// const addedMeals = [{title : "apple pie"}, {title: "steak"}];

export default function AddList({ addedMeals }) {
    return (
        <section className='meals'>
          {addedMeals.map((meal) => {
            return <li key={meal.title}>{meal.title}</li>
          })}
        </section>
    )
  
}

// track meals
// way to add meals
// link this to the add button