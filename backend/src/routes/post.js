const express = require("express");
const { userAuth } = require("../middleware/auth");
const { validatePostData, validatePostUpdateData } = require("../utils/validators");
const postRouter = express.Router();
const Posts = require("../models/posts");
const User = require("../models/user");

postRouter.post("/user/post/add", userAuth, async (req,res)=>{
    try {
        const loggedInUser = req.user;
        const {_id} = loggedInUser;
        const {photoUrl, desc, keywords, title} = req.body;
        validatePostData(req);
        const newPost = new Posts({
            fromUserId:_id,
            photoUrl:photoUrl,
            desc:desc,
            keywords:keywords,
            title:title
        });

        const data = await newPost.save();
        res.status(200).json({message:"Post send successfully", data});


    } catch (error) {
        res.status(400).json({message:"Something went wrong "+error.message});
    }
});

postRouter.get("/user/post/all", userAuth, async (req, res) =>{
    try {
        const loggedInUser = req.user;
        const {_id}= loggedInUser;
        const postData = await Posts.find({
            fromUserId:_id
        });
        res.status(200).json({message:"Post fetched !", data:postData});
    } catch (error) {
        res.status(400).json({message:"Something went wrong : "+error.message});
    }
});

postRouter.get("/user/post/:userId", userAuth, async (req, res) =>{
    const {userId} = req.params;
    try {
        const user = await User.findById(userId);
        if(!user){
            throw new Error("User not found !");
            
        }
        const postData = await Posts.find({
            fromUserId:userId
        }).populate("fromUserId", ["firstName"]);

        res.status(200).json({message:"Posts fetched !", data:postData });

    } catch (error) {
        res.status(400).json({message:"Something went wrong : "+error.message});
        
    }
});

postRouter.get("/user/post/get/:postId", userAuth, async (req, res) =>{
    const {postId} = req.params;
    try {
        const postData = await Posts.findById(postId);
        if(!postData){
        throw new Error("Post not found !");
        
        }
        res.status(200).json({message:"Post fetched !", data:postData});
    } catch (error) {
        res.status(400).json({message:"Something went wrong : "+error.message});
        
    }
});

postRouter.patch("/user/post/edit/:postId", userAuth, async (req, res) =>{
    try {
        const loggedInUser = req.user;
        const postData = req.body;
        const {postId} = req.params;
        const isValidUpdate = validatePostUpdateData(req);
        if(!isValidUpdate){
            res.status(400).json({message:"Update not allowed"});

        }
        const postByUser = await Posts.findOne({_id:postId, fromUserId:loggedInUser._id});
        if(!postByUser){
            throw new Error("Post Not Found");
            
        }
        const post = await Posts.findByIdAndUpdate(postId, postData, {
            returnDocument: "after",
            runValidators: true,
          });
        if(!post){
            throw new Error("Post not found !");
            
        }
        const updatedPost = await post.save();
        res.status(200).json({message:"Post Updated", data :updatedPost});
    } catch (error) {
        res.status(400).json({message:"Something went wrong : "+error.message});
        
    }
});

postRouter.delete("/user/post/delete/:postId", userAuth, async (req, res) =>{
    const loggedInUser = req.user;
    const postId = req.params.postId;
   
    try {
        const postByUser = await Posts.findOne({_id:postId, fromUserId:loggedInUser._id});
        if(!postByUser){
            throw new Error("Post Not Found");
        }
        const data = await Posts.findByIdAndDelete(postId);
        res.status(200).json({message:"Post Deleted !", data});
    } catch (error) {
        res.status(400).json({message:"Something went wrong : "+error.message});
        
    }
});


module.exports = postRouter;
