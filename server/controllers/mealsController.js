// This will help us connect to the database
const dbo = require("../db/conn");
const MealLogDAO = require("../DAO/MealLogDAO.js")

const getMeals=async (req, res, next)=>{
  var date = req.query.date;
  var userId= req.query.userId;
  const db_connect = dbo.getDb("FitArc");
  db_connect
    .collection("workoutLog")
    .find({date,userId})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });  
}

const postMeals = async (req, res, next)=>{
  const db_connect = dbo.getDb("FitArc");
  console.log(req)
  const meal = new MealLogDAO({
    id: req.body?.id,
    userId: req.body?.userId,
    name: req.body?.name,
    calories: req.body?.calories,
    fat: req.body?.fat,
    carb: req.body?.carb,
    date: req.body?.date
  });
  const result = await db_connect
    .collection("MealLog")
    .insertOne(meal)
  res.json({result, success: true})
}

module.exports = {
    getMeals,
    postMeals
}