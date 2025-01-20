const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    photoUrl:{
        type:String,
        required:true
    },
    title:{
        type:String,
        maxLength:100,
        required:true,
        index:true,
    },
    desc:{
        type:String,
        maxLength:255,
        required:true,
        index:true
    },
    keywords:{
        type:[String],
        validate(value){
            if(value.length > 10){
                throw new Error("Keywords can't be more than 10");
            }
        },
        required : true
    },
    fromUserId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
    },
    like:{
        type:Number,
        default:0
    }
},{timestamps:true});

const Posts = mongoose.model("Posts", postSchema);
module.exports = Posts;