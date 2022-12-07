const express = require("express");
 
// usersRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /users.
const usersRouter = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
 
const usersController = require("../controllers/usersController.js") 

const catchErrors = require("../helpers/errorHandler.js")

// usersRouter.get("/human", (req,res,next) => res.json({test: "test"}))

// This section will help you get a list of all the userss.
// if you do not use catchErrors, you have to use try {} catch {} in your controller function around everything
usersRouter.get("/", catchErrors(usersController.getUsers));
 
// This section will help you get a single users by id
usersRouter.get("/:id", function (req, res) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect
   .collection("user")
   .findOne(myquery, function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
usersRouter.post("/login", function (req, response) {
  let db_connect = dbo.getDb();
 let myquery = { email:req.body.email };
 db_connect
   .collection("user")
   .findOne(myquery, function (err, result) {
     if (err) throw err;
     if(result==null){
      console.log("user not found", req.body.email)
      return response.sendStatus(404)
     }
     if(result.password!=req.body.password){console.log("bad password");
     return response.sendStatus(401)
    }
     response.json(result);
   });
})
// This section will help you create a new users.
usersRouter.post("/add", function (req, response) {
 let db_connect = dbo.getDb();
 let myobj = {
   firstName: req.body.firstName,
   lastName: req.body.lastName,
   age: req.body.age,
   email: req.body.email,
   password: req.body.password,
   activityLevel: req.body.activityLevel,
   gender: req.body.gender,
   weight: req.body.weight,
   goal:req.body.goal,
   allergens:req.body.allergens,
   dietOption:req.body.dietOption,
   frequentEquipment:req.body.frequentEquipment
 };
 db_connect.collection("user").insertOne(myobj, function (err, res) {
   if (err) throw err;
   response.json(res);
 });
});
 
// This section will help you update a users by id.
usersRouter.post("/:id", function (req, response) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 let newvalues = {
   $set: {
     name: req.body.name,
     email: req.body.email,
     level: req.body.level,
   },
 };
 db_connect
   .collection("user")
   .updateOne(myquery, newvalues, function (err, res) {
     if (err) throw err;
     console.log("1 document updated");
     response.json(res);
   });
});
 
// This section will help you delete a users
usersRouter.delete("/:id", (req, response) => {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect.collection("user").deleteOne(myquery, function (err, obj) {
   if (err) throw err;
   console.log("1 document deleted");
   response.json(obj);
 });
});
 
module.exports = usersRouter;