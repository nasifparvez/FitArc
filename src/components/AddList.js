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
        'X-RapidAPI-Key': 'e0f2dc5372msh58a1f63256d4d52p18c830jsnd8c99c6c40a2',
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