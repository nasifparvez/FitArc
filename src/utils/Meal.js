import React, {useState, useEffect} from 'react'

export default function Meal({meal, addedMealsTracker}) {
  const [imageUrl, setImageUrl] = useState("");
  const [mealCal, setMealCal] = useState(0);
  const [mealFat, setMealFat] = useState(0);
  const cals = 0;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '220e5cfb44mshce089b2540207f9p1cb4f9jsne3e1c3089e33',
      'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
    }
  };

  function mealsEaten() {

  }

  useEffect(() => {
    fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${meal.id}/information?includeNutrition=true`, options
    )
    .then((response) => response.json())
    .then((data) => {
      setImageUrl(data.image)
      setMealCal(data.nutrition.nutrients.filter((nutrient) => nutrient.name === "Calories")[0].amount)
      setMealFat(data.nutrition.nutrients.filter((nutrient) => nutrient.name === "Fat")[0].amount)
    })
    .catch(err => console.error(err));
  
  }, [meal.id])



  return ( 
  <article>
    <h1>{meal.title}</h1>
    <img src={imageUrl} alt="recipe" />
    <ul className='instructions'>
      <li>Preparation time: {meal.readyInMinutes} minutes</li>
      <li>Number of servings: {meal.servings} </li>
      <li>Calories: {mealCal} kcal</li>
      <li>Fat: {mealFat}g</li>
    </ul>

    <a href={meal.sourceUrl} target="_blank" rel="noopener noreferrer">Go to Recipe</a>
    <button onClick={console.log("meal was clicked")}>Add to Meal MealsEaten</button>  

  </article>
  
  )

  
}
