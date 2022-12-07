const express = require("express");

const mealsController = require("../controllers/mealsController") 
const catchErrors = require("../helpers/errorHandler.js")

const mealsRouter = express.Router();

mealsRouter.get("/", catchErrors(mealsController.getMeals))

mealsRouter.post("/", catchErrors(mealsController.postMeals))



module.exports = mealsRouter;