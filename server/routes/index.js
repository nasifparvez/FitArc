const express = require("express");
 
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /users.
const router = express.Router();

const usersRoutes = require("./users.js")
const workoutsRoutes = require("./workouts.js")

 
// Use child router instances
router.use("/users", usersRoutes)
router.use("/workouts", workoutsRoutes)


module.exports = router;