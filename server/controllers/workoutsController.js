// This will help us connect to the database
const dbo = require("../db/conn");
const WorkoutLogDAO = require("../DAO/WorkoutLogDAO.js")

const getWorkouts=async (req, res, next)=>{
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

const postWorkouts = async (req, res, next)=>{
  const db_connect = dbo.getDb("FitArc");
  console.log(req.body)
  const workout = new WorkoutLogDAO({
    id: req.body?.id,
    time: req.body?.time,
    muscle: req.body?.muscle,
    name: req.body?.name,
    reps: req.body?.reps,
    sets: req.body?.sets,
    date: req.body?.date,
    userId: req.body?.userId
  });
  const result = await db_connect
    .collection("workoutLog")
    .insertOne(workout)
  res.json({result, success: true})
}

module.exports = {
    getWorkouts,
    postWorkouts
}