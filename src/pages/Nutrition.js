import React, {useState} from 'react'
import AddList from '../components/AddList';
import MealList from "../components/MealList";
import "./Nutrition.css"

export default function Nutrition() {
  let test = 0

  const [mealData, setMealData] = useState(null);
  const [userAddedMeals, setUserAddedMeals] = useState([])
  const addListRef = React.createRef()
  const addUserMeal = (meal) => {
    userAddedMeals.push(meal)
    setUserAddedMeals(userAddedMeals)
    console.log(userAddedMeals)
    test++
    addListRef.current.forceUpdate();
  }

  


  const userSex = "male";
  const userWeight = 80;
  const userHeight = 175;
  const userAge = 25;
  const userDietPref = "";
  const userAllergen = "peanuts";
  const userActivity = "light";
  
  // const userAddedMeals = [{title : "pumpkin pie"}, {title: "steak"}];

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
    return data;
  })
  .then((data) => {
    data.meals.forEach((meal) => {
      fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${meal.id}/information?includeNutrition=true`, options
      )
      .then((response) => response.json())
      .then((data) => {
        meal.image = data.image
        meal.calories = data.nutrition.nutrients.filter((nutrient) => nutrient.name === "Calories")[0].amount
        meal.fat = data.nutrition.nutrients.filter((nutrient) => nutrient.name === "Fat")[0].amount
      })
    })
  })
	.catch(err => console.error(err));
  }

  return (
    <div>
    <div className="btn-submit">
      <button className="btn-check" onClick={getMealData}>Get Today's Meal Plan</button>
    </div>
      <div className="nutrition">
        {mealData && <MealList mealData={mealData} addUserMeal={addUserMeal} />}
        {mealData && <AddList mealData={mealData} userAddedMeals={userAddedMeals} ref={addListRef} test={test}/>}
      </div>
    <div className="btn-submit">
      <button className="btn-check" onClick={getMealData}>Request Different Meals</button>
    </div>
    </div>
  );
}