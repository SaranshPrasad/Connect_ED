const express = require("express");
const chatRouter = express.Router();
const { Chat } = require('../models/chat');

const { userAuth } = require("../middleware/auth");

chatRouter.get("/chat/:toUserId",userAuth, async(req, res) => {
    const {toUserId} = req.params;
    const userId = req.user._id;
    try {
        let chat = await Chat.findOne({
            participants:{
                $all: [userId, toUserId]
            },
        }).populate({
            path:"messages.senderId",
            select:"firstName"
        });
        if(!chat){
            chat = new Chat({
                participants: [userId, toUserId],
                messages:[],
            });
            await chat.save();
        }
        res.json(chat);
    } catch (error) {
        console.error(error.message)
    }
})


module.exports = chatRouter;
