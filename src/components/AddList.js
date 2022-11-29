import { render } from '@testing-library/react';
import React, { useEffect } from 'react'

// const addedMeals = [{title : "apple pie"}, {title: "steak"}];
var totCal = 0;

class AddList extends React.Component {
  constructor(props) {
    super(props)
    this.mealData = this.props.mealData
    this.userAddedMeals = this.props.userAddedMeals
    this.test = this.props.test
    this.options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '220e5cfb44mshce089b2540207f9p1cb4f9jsne3e1c3089e33',
        'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
      }
    };
  }


  getMealCal(meal) {
    // let nutrients = this.mealData.filter((m) => m.id == meal.id)[0].nutrients
    console.log(this.mealData)
    return 0
  }
  getMealFat(meal) {
    // let nutrients = this.mealData.filter((m) => m.id == meal.id)[0].nutrients
    return 0
  }
  getMealCarb(meal) {
    return 0
  }
  getTotCal() {
    this.userAddedMeals.forEach(meal =>{
      totCal = totCal + meal.calories
      console.log(meal)
    })
    return totCal
  }


  render() {
    this.userAddedMeals.forEach(meal => {

    });

    return (
      <div>
        <h2>Meals Eaten</h2>
        <h3>Total Calories: {this.getTotCal().toFixed(2)}</h3>
        <div className="mealInfo">
            {this.userAddedMeals.map((meal) => {
              return <li key={meal.title}>Name: <br/> {meal.title} <br/>
              Cal: {meal.calories}  <br/>Fat: {meal.fat}g <br/></li>
            })}
        </div>
        </div>
    )
  }
  }

  export default AddList


// track meals
// way to add meals
// link this to the add button