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
      carbs: meal.carb
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
  var tdee2
  
  var userWeightNum = parseInt(userWeight)
  var userHeightFeetNum = parseInt(userHeightFeet)
  var userHeightInchesNum = parseInt(userHeightInches)
  var userAgeNum = parseInt(userAge)

  var userHeight = (((12 * userHeightFeetNum) + userHeightInchesNum) * 2.54)

  /* "BMR Definition: Your Basal Metabolic Rate (BMR) is the number of calories you burn as your body performs basic (basal) life-sustaining function. 
      Commonly also termed as Resting Metabolic Rate (RMR), which is the calories burned if you stayed in bed all day." 
      “Basal Metabolic Rate Calculator.” Garnet Health, https://www.garnethealth.org/news/basal-metabolic-rate-calculator#:~:text=BMR%20Definition%3A%20Your%20Basal%20Metabolic,stayed%20in%20bed%20all%20day.  */


  if (userSex === "Male"){
    bmr = (88.362 + (13.397 * userWeightNum) + (4.799 * userHeight) - (5.677 * userAgeNum));
  }
  else {
    bmr = (447.593 + (9.247 * userWeightNum) + (3.098 * userHeight) - (4.330 * userAgeNum));
  }

/* "Total daily energy expenditure (TDEE) estimates how many calories your body burns daily by accounting for three major contributing factors: 
    your basal metabolic rate (BMR), your activity level and the thermic effect of food metabolism."
    “Total Daily Energy Expenditure (TDEE) Calculator.” Forbes, Forbes Magazine, 9 Nov. 2022, https://www.forbes.com/health/body/tdee-calculator/#:~:text=Total%20daily%20energy%20expenditure%20(TDEE)%20estimates%20how%20many%20calories%20your,thermic%20effect%20of%20food%20metabolism. */

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

  /* To lose weight one needs to be on a calorie deficit, and depending on how much weight one wants to lose the amount of calories removed from the TDEE also changes. 
    Same thing for weight gain */

  switch(weightGoal) {
    case "lose .25kg a week":
      tdee2 = tdee - 250
      break
    case "lose .5kg a week":
      tdee2 = tdee - 500
      break
    case "lose 1kg a week":
      tdee2 = tdee - 1000
      break
    case "":
      break
    case "gain .25kg a week":
      tdee2 = tdee + 250
      break
    case "gain .5kg a week":
      tdee2 = tdee + 500
      break
    case "gain 1kg a week":
      tdee2 = tdee + 1000
      break
  }

  var userCalories = tdee2
  
   useEffect(() => {
    async function getRecords(){
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}users/${localStorage.getItem("userId")}`);

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
      setUserDietPref(records.dietOption)
      setUserHeightFeet(records.heightFeet)
      setUserHeightInches(records.heightInches)
      setWeightGoal(records.bodyGoal)
      console.log(userWeight,userAge, userAllergen,userActivity,userSex)
    }

    getRecords();

    return;
  }, [records.length]); 

  const submitMeals = async (event) =>{
    for(const meal of mealsChosen){
    await fetch(`${process.env.REACT_APP_BASE_URL}meals/`,{method:"POST",body:JSON.stringify({...meal, date:`${today.getFullYear()}-${(today.getMonth()+1).toString().padStart(2,"0")}-${today.getDate().toString().padStart(2,"0")}`,userId:localStorage.getItem("userId")}), headers:{"content-type": "application/json"}})
  }
  }
  

  


  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '220e5cfb44mshce089b2540207f9p1cb4f9jsne3e1c3089e33',
      'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
    }
  };

  


  

  function getMealData(){
    console.log("getMealdata")
    console.log(userActivity, userDietPref, userAllergen, userSex, userCalories)
    console.log(userAddedMeals)
    console.log(tdee, tdee2, bmr)
    console.log(userWeightNum, userHeight, userAgeNum)

    fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/mealplans/generate?timeFrame=day&targetCalories=${userCalories}&diet=${userDietPref}&exclude=${userAllergen}`, options)
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