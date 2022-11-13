const express = require("express");

const workoutsController = require("../controllers/workoutsController") 
const catchErrors = require("../helpers/errorHandler.js")

const workoutsRouter = express.Router();

workoutsRouter.get("/", catchErrors(workoutsController.getWorkouts))

workoutsRouter.post("/", catchErrors(workoutsController.postWorkouts))



module.exports = workoutsRouter;