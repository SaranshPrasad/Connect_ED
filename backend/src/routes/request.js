const express = require("express");
const requestRouter = express.Router();
const {userAuth} = require("../middleware/auth");
const  Connection  = require("../models/connection");

requestRouter.post("/request/send/:status/:toUserId", userAuth , async (req, res) =>{
    const {status , toUserId} = req.params;
    const fromUserId = req.user._id;
    try {
        const allowedStatus = ["interested", "ignored"];
        if(!allowedStatus.includes(status)){
            res.status(400).json({message:"Invalid Status", status});
        }
        // find existing connection request
        const existingConnectionRequest = await Connection.findOne({
            $or:[
                {fromUserId, toUserId},
                {fromUserId:toUserId, toUserId:fromUserId},
            ],
        });
        if(existingConnectionRequest){
            throw new Error("Connection request  is already exists !");
        }
        // Save the new connection
        const connectionRequest = new Connection({
            fromUserId,
            toUserId,
            status,
        });
        // const toUser = await Connection.findById(toUserId);
        const data = await connectionRequest.save();
        res.status(200).json({data});
    } catch (error) {
        res.status(400).json({message:"Something went wrong : "+error.message});
    }
});

requestRouter.post("/request/review/:status/:requestId", userAuth , async (req, res) => {
    try {
        const {status , requestId} = req.params;
        const loggedInUser = req.user;
        const allowedStatus = ["accepted", "rejected"];
        if(!allowedStatus.includes(status)){
            throw new Error("Invalid  status !");
        }
        const existingReq = await Connection.findOne({
            _id:requestId,
            toUserId:loggedInUser._id,
            status:"interested"
        });
        if(!existingReq){
            throw new Error("Request not found !");
        }
        existingReq.status = status;
        const data = await existingReq.save();
        res.status(200).json({message:`Connection changed to ${status}`, data});

    } catch (error) {
        res.status(400).json({message:"Something went wrong : "+error.message});
    }
});
module.exports = requestRouter;