const express = require("express");

const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

const workoutsController = require("../controllers/workoutsController") 
const catchErrors = require("../helpers/errorHandler.js")

const workoutsRouter = express.Router();

workoutsRouter.get("/", catchErrors(workoutsController.getWorkouts))

workoutsRouter.post("/", catchErrors(workoutsController.postWorkouts))

workoutsRouter.get("/:id", function (req, res) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect
      .collection("workoutLog")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
   });

module.exports = workoutsRouter;