import React, {useState, useEffect} from 'react'
import AddList from '../components/AddList';
import MealList from "../components/MealList";
import "./Nutrition.css"

export default function Nutrition() {
  let test = 0

  const [mealData, setMealData] = useState(null);
  const [userAddedMeals, setUserAddedMeals] = useState([])
  const [records, setRecords] = useState([]);
  const addListRef = React.createRef()
  const addUserMeal = (meal) => {
    userAddedMeals.push(meal)
    setUserAddedMeals(userAddedMeals)
    console.log(userAddedMeals)
    test++
    addListRef.current.forceUpdate();
  }


  var userSex;
  var userWeight;
  var userHeight;
  var userAge;
  var userDietPref;
  var userAllergen;
  var userActivity;
  var bmr;
  var tdee;
  var weightGoal

  if (userSex === "male"){
    bmr = (88.362 + (13.397 * userWeight) + (4.799 * userHeight) - (5.677 * userAge));
  }
  else {
    bmr = (447.593 + (9.247 * userWeight) + (3.098 * userHeight) - (4.330 * userAge));
  }
  
  switch(userActivity) {
    case "sedentary":
      tdee = bmr * 1.2
      break
    case "light":
      tdee = bmr * 1.375
      break
    case "moderate":
      tdee = bmr * 1.55
      break
    case "heavy":
      tdee = bmr * 1.725
      break
    case "athlete":
      tdee = bmr * 1.9
  }

  switch(weightGoal) {
    case "-0.25":
      tdee = tdee - 250
      break
    case "-0.5":
      tdee = tdee - 500
      break
    case "-1":
      tdee = tdee - 1000
      break
    case "0":
      break
    case "0.25":
      tdee = tdee + 250
      break
    case "0.5":
      tdee = tdee + 500
      break
    case "1":
      tdee = tdee + 1000
  }
  
  const calories = (tdee - 500);
  
  useEffect(() => {
    async function getRecords(){
      const response = await fetch('http://localhost:5000/users/');

      if (!response.ok){
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const records = await response.json();
      setRecords(records);
      console.log("success");
      userSex = records[1].sex;
      userWeight = records[1].weight;
      userAge = records[1].age;
      userActivity = records[1].activityLevel;
      userDietPref = records[1].dietPref;
      userAllergen = records[1].allergen
      userHeight = records[1].height;
      weightGoal = records[1].weightGoal;
      console.log(userWeight,userAge, userAllergen,userActivity,userSex)
    }

    getRecords();

    return;
  }, [records.length]);





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