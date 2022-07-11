const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const UserModel = require('./models/User.js');
const OpponentModel = require('./models/Opponent.js');

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://admin:epicodus@cluster0.bhljv.mongodb.net/boxing-sim?retryWrites=true&w=majority");



/***

USER

***/

//create endpoints for client requests, return model you want to send.
app.get("/users", (req, res) => {

  UserModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  })
})


app.post("/addUser", async (req, res) => {

  //create body, instantiate new model to store in db, await saving it
  const user = req.body
  const newUser = new UserModel(user);
  console.log(newUser)
  await newUser.save();

  res.json(user);
})



/***

OPPONENTS

***/


app.get("/getOpponents", (req, res) => {

  OpponentModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  })
})


app.get("/getOpponent", (req, res) => {

  OpponentModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  })
})


app.post("/addOpponent", async (req, res) => {

  const opp = req.body
  const newOpp = new OpponentModel(opp);
  await newOpp.save();

  res.json(newOpp);
})


app.listen(3001, () => console.log("Server running!"))
