const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const userSchema = new  mongoose.Schema({
    firstName:{
        type:String,
        minLength:4,
        maxLength:25,
        trim:true,
        default: "First Name"

    },
    lastName:{
        type:String,
        trim:true,
        default: "Last Name"
    },
    emailId:{
        type:String,
        lowercase:true,
        trim:true,
        unique:true,
        minLength:4,
        required:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is not valid : "+value);
                
            }
        }
    },
    password:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        min:18,
       
    },
    gender:{
        type:String,
        lowercase:true,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender data is not Valid !");
            }
        },
        default: "Others"
    },
    skills:{
        type:[String],
        validate(value){
            if(value.length > 10){
                throw new Error("Skills can't be more than 10");
            }
        }
    },
    about:{
        type:String,
        maxLength:100,
        default:"I'm dev Looper !",

    },
    photoUrl:{
        type:String,
        default: " ",
        trim:true,
    },
    userName:{
        type:String,
        required: true,
        unique:true,
        maxLength:10,
        minLength:4
    },
    jobTitle:{
        type:String,
        maxLength:25,
        minLength:5,
        default:" Job Title",
        trim:true
    },
    location:{
        type:String,
        maxLength:20,
        minLength:3,
        default:"Location",
        trim:true
    }
}, {timestamps:true});

// function to get the jwt token 
userSchema.methods.getJWT = async function() {
    const user = this;
    const token = await jwt.sign({_id:user._id}, "ALUMINICONNECT@009", {expiresIn:"1d"});
    return token;
}

// helping function for validating the password 
userSchema.methods.validatePassword = async function(password) {
    const user = this;
    const isPasswordValid = await bcrypt.compare(password, user.password);
    return isPasswordValid;
}

const User = mongoose.model("User", userSchema);
module.exports = User;
