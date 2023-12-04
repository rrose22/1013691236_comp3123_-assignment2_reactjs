var express = require('express')
var UserModel = require("../models/users")
var jwt = require('jsonwebtoken')
var userRoutes = express.Router();

const createToken = (id) => {
  return jwt.sign({id}, 'assignment2secretcode', {
    expiresIn: '1d'
  })
}
//receive all users
userRoutes.get("/", async (req,res)=>{
  try {
    const userList = await UserModel.find()
    res.status(200).send(userList)
  } catch (error) { 
    res.status(404).send(error)
  }
})

userRoutes.post("/signup", async (req, res) => {
  console.log(req.body);
  try {
    const newUser = new UserModel({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email
    });
    await newUser.save();
    const token = createToken(newUser._id);
    const maxAge = 3 * 8 * 60 * 60 * 1000; // Convert to milliseconds
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge });
    res.status(201).send(`${newUser.username} was added`);
  } catch (error) {
    console.log(error);
    res.status(404).send(error.message || 'An error occurred during signup');
  }
});

userRoutes.post("/login",  async (req,res) =>{
  try {
    var foundUser = await UserModel.findOne({username: req.body.username, password: req.body.password})
    if(foundUser) {
        res.status(200).json({
          status: true,
          username : foundUser.username,
          message: foundUser.username + " was logged in successfully"})
    }
    else{
      res.status(200).json({
        status: false,
        message: "Can't log in successfully. Incorrect Password/Username"})
    }
  } catch (error) {
    res.status(404).send("Error Occured")
  }
})





module.exports = userRoutes