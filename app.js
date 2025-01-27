const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const fs = require("fs");
const cors = require("cors");
require("./db");
// const User = require("./models/Users");
// const { error } = require("console");
app.use(bodyParser.json());
app.use(cors());

const transactionRoutes = require("./app/TransactionRoutes")
app.use("/transactions", transactionRoutes)

const userRoutes = require("./User/UserRoutes")
app.use("/users", userRoutes)

app.listen(8008, () => {
  console.log("server started");
});

// app.get("/", (req, res) => {
//   res.send("server is working");
// });
// app.get("/user", (req, res) => {
//   res.send("server is working");
// });
// app.post("/user", (req, res) => {
//   console.log(req.body);
//   const { name, email, mobile } = req.body;
//   let userDetailes = `name:${name};email${email};mobile${mobile}`;
//   User.create({ name, email, mobile })
//     .then((DataBaseres) => {
//       res.send("user created successfully");
//     })
//     .catch((err) => {
//       console.log(err);
//       res.send("something went wrong");
//     });
//   fs.writeFileSync("user.txt", userDetailes);
// });
// app.get("/users", (req, res) => {
//   User.find({})

//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.send(err);
//     });
 
// });
// app.patch("/user/:id", (req, res)=>{
//     const {id} = req.params
//     const {mobile} = req.body
//     User.findOneAndUpdate({_id:id}, {mobile} )
//     .then(resDb=>{
//       res.send("data updated successfully")
//     }).catch(err=>{
//       res.send("error in data update")
//     })
  
//   })
  
//   app.delete("/user/:id", (req, res)=>{
//     const {id} = req.params
//     User.findOneAndDelete({_id:id})
//     .then(dbRes=>{
//       res.send("data deleted successfully")
//     }).catch(err=>{
//       res.send("some error occured while deleting the data")
//     })
//   })


