import React, {useState, useEffect} from 'react'
import AddList from '../components/AddList';
import MealList from "../components/MealList";
import "./Nutrition.css"

export default function Nutrition() {
  const today = new Date()

  const [mealData, setMealData] = useState(null)
  const [userAddedMeals, setUserAddedMeals] = useState([])
  const [records, setRecords] = useState([])
  const addListRef = React.createRef()
  const addUserMeal = (meal) => {
    userAddedMeals.push(meal)
    setUserAddedMeals(userAddedMeals)
    console.log(userAddedMeals)
    addListRef.current.forceUpdate();
  }

  const removeUserMeal = (meal) => {
    userAddedMeals.splice(userAddedMeals.length - 1, 1)
    setUserAddedMeals(userAddedMeals)
    console.log(userAddedMeals)
    addListRef.current.forceUpdate();
  }
  var mealsChosen = []
  const addMealsChosen = (meal) => {
    
    userAddedMeals.forEach(meal => {
    mealsChosen.push({
      id: meal.id,
      name: meal.title,
      calories: meal.calories,
      fat: meal.fat,
      carb: meal.carb
    })
    })
    console.log(mealsChosen)
  }

  const [userSex, setUserSex] = useState(null);
  const [userWeight, setUserWeight] = useState(null)
  const [userHeightFeet, setUserHeightFeet] = useState(null)
  const [userHeightInches, setUserHeightInches] = useState(null)
  const [userAge, setUserAge] = useState(null)
  const [userDietPref, setUserDietPref] = useState(null)
  const [userAllergen, setUserAllergen] = useState(null)
  const [userActivity, setUserActivity] = useState(null)
  const [weightGoal, setWeightGoal] = useState(null)

  var bmr
  var tdee
  
  var userWeightNum = parseInt(userWeight)
  var userHeightFeetNum = parseInt(userHeightFeet)
  var userHeightInchesNum = parseInt(userHeightInches)
  var userAgeNum = parseInt(userAge)

  var userHeight = (((12 * userHeightFeetNum) + userHeightInchesNum) * 2.54)



  if (userSex === "Male"){
    bmr = (88.362 + (13.397 * userWeightNum) + (4.799 * userHeight) - (5.677 * userAgeNum));
  }
  else {
    bmr = (447.593 + (9.247 * userWeightNum) + (3.098 * userHeight) - (4.330 * userAgeNum));
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
      break
  }

  switch(weightGoal) {
    case "lose .25kg a week":
      tdee = tdee - 250
      break
    case "lose .5kg a week":
      tdee = tdee - 500
      break
    case "lose 1kg a week":
      tdee = tdee - 1000
      break
    case "":
      break
    case "gain .25kg a week":
      tdee = tdee + 250
      break
    case "gain .50kg a week":
      tdee = tdee + 500
      break
    case "gain 1kg a week":
      tdee = tdee + 1000
      break
  }
  
   useEffect(() => {
    async function getRecords(){
      const response = await fetch(`http://localhost:5000/users/${localStorage.getItem("userId")}`);

      if (!response.ok){
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const records = await response.json();
      setRecords(records);
      console.log("success");
      setUserSex(records.gender)
      setUserWeight(records.weight)
      setUserAge(records.age)
      setUserActivity(records.activityLevel)
      setUserAllergen(records.allergens)
      setUserDietPref(records.diet)
      setUserHeightFeet(records.heightFeet)
      setUserHeightInches(records.heightInches)
      setWeightGoal(records.bodyGoal)
      console.log(userWeight,userAgeNum, userAllergen,userActivity,userSex)
    }

    getRecords();

    return;
  }, [records.length]); 

  const submitMeals = async (event) =>{
    for(const meal of mealsChosen){
    await fetch('http://localhost:5000/meals/',{method:"POST",body:JSON.stringify({...meal, date:`${today.getFullYear()}-${(today.getMonth()+1).toString().padStart(2,"0")}-${today.getDate().toString().padStart(2,"0")}`,userId:localStorage.getItem("userId")}), headers:{"content-type": "application/json"}})
  }
  }
  

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '220e5cfb44mshce089b2540207f9p1cb4f9jsne3e1c3089e33',
      'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
    }
  };

  var calories = 2000

  function getMealData(){
    console.log("getMealdata")
    console.log(userWeight,userAgeNum, userAllergen,userActivity,userSex)
    console.log(userAddedMeals)

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
        meal.title = data.title
        meal.calories = data.nutrition.nutrients.filter((nutrient) => nutrient.name === "Calories")[0].amount
        meal.fat = data.nutrition.nutrients.filter((nutrient) => nutrient.name === "Fat")[0].amount
        meal.carb = data.nutrition.nutrients.filter((nutrient) => nutrient.name === "Carbohydrates")[0].amount
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
        {mealData && <AddList mealData={mealData} userAddedMeals={userAddedMeals} ref={addListRef}/>}
      </div>
    <div className="btn-submit">
      <button className="btn-check" onClick={getMealData}>Request Different Meals</button>
    </div>
    <div className='btn-clear'>
      <button className='btn-check' onClick={removeUserMeal}>Remove Last Added Meal</button>
    </div>
    <div className='btn-clear'>
      <button className='btn-check' onClick={addMealsChosen}>Confirm Meals Eaten</button>
    </div>
    <div className='btn-clear'>
      <button className='btn-check' onClick={submitMeals}>Submit</button>
    </div>
    </div>
  );
}