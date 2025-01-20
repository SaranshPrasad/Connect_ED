const express = require("express");
const { userAuth } = require("../middleware/auth");
const Connection = require("../models/connection");
const User = require("../models/user");
const userRouter = express.Router();

userRouter.get("/user/request/received", userAuth, async (req, res) => {
  const loggedInUser = req.user;
  try {
    const connectionRequest = await Connection.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", ["firstName",  "photoUrl"]);
    if (!connectionRequest) {
      throw new Error("No request found");
    }
    res
      .status(200)
      .json({ message: "Connection fetched !", connectionRequest });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Something went wrong : " + error.message });
  }
});

userRouter.get("/user/all/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connections = await Connection.find({
      $or: [
        {
          toUserId: loggedInUser._id,
          status: "accepted",
        },
        {
          fromUserId: loggedInUser._id,
          status: "accepted",
        },
      ],
    })
      .populate("fromUserId", ["firstName", "photoUrl"])
      .populate("toUserId", ["firstName",  "photoUrl"]);

    const data = connections.map((k) => {
      if (k.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return k.toUserId;
      } else {
        return k.fromUserId;
      }
    }).filter((userId) => userId !== null);
    
    res.status(200).json({ message: "Data fetched", data: data });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Something went wrong : " + error.message });
  }
});

userRouter.get("/user/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 10 ? 10 : limit;
    const skip = (page - 1) * limit;
    const allConnectionRequests = await Connection.find({
        $or:[
          {fromUserId:loggedInUser._id},
          {toUserId:loggedInUser._id},
        ],
      }).select("fromUserId toUserId");

      const hideUsersFromFeed = new Set();
      allConnectionRequests.forEach((reqs) => {
        hideUsersFromFeed.add(reqs.fromUserId.toString());
        hideUsersFromFeed.add(reqs.toUserId.toString());
      });
      const users = await User.find({
        $and:[
           { _id: {$nin: Array.from(hideUsersFromFeed)}},
           { _id: {$ne: loggedInUser._id}},
        ],
      }).select("firstName lastName  skills about jobTitle location userName photoUrl").skip(skip).limit(limit);
      res.status(200).json({message:"Feed data fetched !", users})
  } catch (error) {
    res.status(400).json({message:"Something went wrong !"+error.message});
  }
});

module.exports = userRouter;
