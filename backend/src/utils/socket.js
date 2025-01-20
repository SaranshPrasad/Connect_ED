const socket = require('socket.io');
const { Chat } = require('../models/chat');
require("dotenv").config();
const crypto = require("crypto");

const generateRoomId = (userId, toUserId) => {
    return crypto.createHash("sha256").update([userId, toUserId].sort().join("_")).digest("hex");
}
const initializeSocket = (server) => {
    const io = socket(server, {
        cors:{
            origin:process.env.URL
        },
    });
    io.on("connection", (socket) => {
        socket.on("joinChat", async ({firstName, userId, toUserId}) => {
            const roomId = generateRoomId(userId,toUserId);
            socket.join(roomId);
        });
        socket.on("sendMessage", async ({firstName, userId, toUserId, text, time}) => {
            const roomId = generateRoomId(userId, toUserId);
            try {
                let chat = await Chat.findOne({
                    participants: {$all: [userId, toUserId]}
                });
                if(!chat){
                    chat = new Chat({
                        participants: [userId, toUserId],
                        messages:[],
                    });
                }
                chat.messages.push({
                    senderId:userId,
                    text:text
                });

                await chat.save();
                io.to(roomId).emit("messageReceived", {firstName, text, time});
            } catch (error) {
                console.error(error.message);
            }
            
        });
        socket.on("disconnect", () => {});

    });
}
module.exports = initializeSocket;