import React, {useState} from 'react'
import AddList from '../utils/AddList';
import MealList from "../utils/MealList";
import "./Nutrition.css"

export default function Nutrition() {
  const [mealData, setMealData] = useState(null);


  const userSex = "male";
  const userWeight = 80;
  const userHeight = 175;
  const userAge = 25;
  const userDietPref = "";
  const userAllergen = "peanuts";
  const userActivity = "light";
  
  const userAddedMeals = [{title : "pumpkin pie"}, {title: "steak"}];

  const bmr = (88.362 + (13.397 * userWeight) + (4.799 * userHeight) - (5.677 * userAge));
  const tdee = (bmr * 1.375);

  const calories = (tdee - 500);


  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '220e5cfb44mshce089b2540207f9p1cb4f9jsne3e1c3089e33',
      'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
    }
  };

  

  function getMealData(){
    fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/mealplans/generate?timeFrame=day&targetCalories=${calories}&diet=${userDietPref}&exclude=${userAllergen}`, options)
	.then(response => response.json())
  .then((data) => {
    setMealData(data);
    console.log(data)
  })
	.catch(err => console.error(err));
  }

  return (
    <div className="nutrition">

      
      <button onClick={getMealData}>Get Today's Meal Plan</button>
      {mealData && <MealList mealData={mealData} addedMeals={userAddedMeals} />}
      

      <button onClick={getMealData}>Request Different Meals</button>
      <AddList addedMeals={userAddedMeals}/>

    </div>
  );
}
