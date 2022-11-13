const express = require("express");
require("dotenv").config({ path: "./config.env" }); // load config file (will make it possible to use .env file for ENV variable)
const app = express();
const cors = require("cors");
const routes = require("./routes");

// Get driver connection
const dbo = require("./db/conn");
const port = process.env.PORT || 5000; // PORT=VALUE is one line of your .env file

// Server App Settings Middleware
app.use(cors()); // Because you cannot use send a request from same domain (everything is on localhost when working locally)
app.use(express.json());


// Add routes to the Server App
//app.get("/human", (req, res, next)  => res.json({id: 8, name: "Tst"}));
app.use(routes);

// Launch the Server App on choosen port
app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
 
  });
  console.log(`Server is running on port: ${port}`);
});

//test
// app.get('/', (req,res) => {
//   res.send('hello world');
// });
