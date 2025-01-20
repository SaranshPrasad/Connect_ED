const jwt = require("jsonwebtoken");
const User = require("../models/user");
const userAuth = async (req, res, next) => {
    // get token from cookie which is saved when login or signup
    const {token} = req.cookies;
    try {
        // If token is not present 
        if(!token){
            throw new Error("Login Again");
        }
        // get the _id from token
        const decodedMessage = await jwt.verify(token, "ALUMINICONNECT@009");
        const {_id} = decodedMessage;
        // find user with _id to check user is present or not !
        const user = await User.findById(_id);
        if(!user){
            throw new Error("User not found !"); 
        }
        // Set the user in req 
        req.user = user;
        // call the next function
        next();
    } catch (error) {
        res.status(400).json({message:"Something Went Wrong : "+error.message});
    }
}

module.exports = {userAuth};