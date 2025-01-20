const express = require("express");
const authRouter = express.Router();
const {userAuth} = require("../middleware/auth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const User = require("../models/user");
const {validateSignUpData , validateLoginData } = require("../utils/validators")

authRouter.use(express.json());
authRouter.use(cookieParser());

authRouter.post("/auth/signup", async (req, res) => {
    const {emailId , password , userName  } = req.body;
    try {
        validateSignUpData(req);
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
             emailId, password:hashedPassword, userName
        });
        const data = await newUser.save();
        res.status(200).json({message:"User saved successfully", data});
    } catch (error) {
        res.status(400).send("Something went wrong : "+error.message);
    }
});

authRouter.post("/auth/login", async (req, res) => {
    const {emailId , password } = req.body;
    try {
        validateLoginData(req);
        if(!emailId){
            throw new Error("Invalid email and password !"); 
        }
        const user = await User.findOne({emailId:emailId});
        if(!user){
            return res.status(404).json({message:"Invalid credentials !"});    
        }
        const isValidPassword = user.validatePassword(password);
        if(isValidPassword){
            const token =  await user.getJWT();
            res.cookie('token', token);
            return res.status(200).json({message:"User logged In successfully !!" , user, token:token});
        }
    } catch (error) {
        res.status(400).json({message:"Something went wrong "+error.message})
    }
});

authRouter.post("/auth/logout", userAuth , async (req, res) => {
    const {firstName}  = req.user;
      res.cookie("token", null, {
        expires: new Date(Date.now()),
      });
      res.status(200).json({message:`${firstName} Logout Successfully !`})
});



module.exports = authRouter;