const dbo = require("../db/conn");
// const WorkoutLogDAO = require("../DAO/WorkoutLogDAO.js")

const getMeals=async (req, res, next)=>{
  const db_connect = dbo.getDb("FitArc");
  db_connect
    .collection("mealLog")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });  
}

module.exports = {
    getMeals
}