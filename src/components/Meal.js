import React, {useState, useEffect} from 'react'

export default function Meal({meal, addUserMeal}) {
  const [imageUrl, setImageUrl] = useState("");
  const [mealCal, setMealCal] = useState(0);
  const [mealFat, setMealFat] = useState(0);
  const [mealCarb, setMealCarb] = useState(0);
  const cals = 0;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '220e5cfb44mshce089b2540207f9p1cb4f9jsne3e1c3089e33',
      'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
    }
  };

  useEffect(() => {
    fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${meal.id}/information?includeNutrition=true`, options
    )
    .then((response) => response.json())
    .then((data) => {
      setImageUrl(data.image)
      setMealCal(data.nutrition.nutrients.filter((nutrient) => nutrient.name === "Calories")[0].amount)
      setMealFat(data.nutrition.nutrients.filter((nutrient) => nutrient.name === "Fat")[0].amount)
      setMealCarb(data.nutrition.nutrients.filter((nutrient) => nutrient.name === "Carbohydrates")[0].amount)
    })
    .catch(err => console.error(err));
  
  }, [meal.id])



  return ( 
  <article className="meal-card">
    <h1>{meal.title}</h1>
    <img className="meal-img" src={imageUrl} alt="recipe" />
    <ul className='instructions'>
      <li>Preparation time: {meal.readyInMinutes} minutes</li>
      <li>Calories: {mealCal} kcal</li>
      <li>Fat: {mealFat}g</li>
      <li>Carbs: {mealCarb}g</li>
    </ul>

    <a className="link-text" href={meal.sourceUrl} target="_blank" rel="noopener noreferrer">Go to Recipe</a>
    <button className="btn-check" onClick={()=>{addUserMeal(meal)}
                    }>Add to Meal MealsEaten</button>

  </article>
  
  )

  
}