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

 const postUsers = async (req, res, next)=>{
  const db_connect = dbo.getDb("FitArc");
  console.log(req)
  const result = await db_connect
    .collection("user")
    .insertOne({})
  res.json({result, success: true})
}

 module.exports = {
  getUsers,
  postUsers,
  //other function,
 }

