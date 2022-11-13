// This will help us connect to the database
const dbo = require("../db/conn");

const getUsers = async (req, res) => {
  let db_connect = dbo.getDb("FitArc");
  db_connect
    .collection("user")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
 }

 module.exports = {
  getUsers,
  //other function,
  //other function,
 }