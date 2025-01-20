const express = require("express");
const { userAuth } = require("../middleware/auth");
const { validateUpdateData } = require("../utils/validators");
const User = require("../models/user");
const profileRouter = express.Router();
const bcrypt = require("bcrypt");

profileRouter.get("/user/profile", userAuth, async (req, res) => {
    const user = req.user;
    const allowedData = ["firstName", "lastName", "age", "gender", "skills", "about", "photoUrl", "userName", "jobTitle", "location", "_id"];
    try {
        const data = {};
        allowedData.forEach((key) => {
            if (user[key] !== undefined) {
                data[key] = user[key];
            }
        });
        res.status(200).json({message:"Data Fetched Successfully ", data});
    } catch (error) {
        res.send(error.message);
    }
});

profileRouter.patch("/user/profile/edit", userAuth, async (req, res) => {
    const userId = req.user._id;
    const userData = req.body;
    try {
       const isAllowedUpdates = validateUpdateData(req);
    if (!isAllowedUpdates) {
      throw new Error("Update not allowed !");
    }
    const user = await User.findByIdAndUpdate(userId, userData, {
        returnDocument: "after",
        runValidators: true,
      });
      res.status(200).json({message:"User data updated successfully", data:user});

    } catch (error) {
        res.status(400).json({message:"Something went wrong :"+error.message});
    }
});

profileRouter.delete("/user/profile/delete", userAuth, async (req, res) =>{
    try {
        const loggedInUser = req.user;
        const {_id} = loggedInUser;
        const confirmPassword = req.body;
        const isPasswordValid = await loggedInUser.validatePassword(confirmPassword);
        if(!isPasswordValid){
            throw new Error("Invalid password !")
        }
        const data = await User.findByIdAndDelete(_id);
        res.status(200).json({message:"User deleted successfully !", data});
    } catch (error) {
        res.status(400).json({message:"Something went wrong : "+error.message});
    }
})

profileRouter.post("/user/profile/edit/password", userAuth, async (req, res) => {
    try {
        const {currentPassword , newPassword , confirmPassword } = req.body;
    const user = req.user;
    const {_id} = req.user._id;

    const isValidpassword = await user.validatePassword(currentPassword);
    if(!isValidpassword){
        throw new Error("Wrong password !");
    }

    if(newPassword != confirmPassword){
        throw new Error("Password not matched !");
    }

    const newHashedPassword = await bcrypt.hash(newPassword, 10);
    const currentUser = await User.findByIdAndUpdate(_id, {
        password:newHashedPassword
    });
    const data = await currentUser.save();
    res.status(200).json({message: "Password Updated !", data:data});

    } catch (error) {
        res.status(400).json({message:"Something went wrong : "+error.message});
    }
});

module.exports = profileRouter;