import { render } from '@testing-library/react';
import React, { useEffect } from 'react'


class AddList extends React.Component {
  constructor(props) {
    super(props)
    this.mealData = this.props.mealData
    this.userAddedMeals = this.props.userAddedMeals
    this.options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '220e5cfb44mshce089b2540207f9p1cb4f9jsne3e1c3089e33',
        'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
      }
    };
  }

  getMealCal(meal) {
    console.log(this.mealData)
    return 0
  }
  getMealFat(meal) {
    return 0
  }

  getMealCarb(meal){
    return 0
  }

  render() {
    this.userAddedMeals.forEach(meal => {

    });

    return (
        <div>
            <div className="mealInfo">
            <h2>Meals Eaten Today</h2>
            {this.userAddedMeals.map((meal) => {
              return <li key={meal.title}>Name: {meal.title}: <br/>
              Cal:{meal.calories}kcal, <br/>Fat: {meal.fat}g <br/>Carbs: {meal.carb}</li>
            })}
            </div>
            
            
        </div>
        

    )
  }
  }
  
  export default AddList