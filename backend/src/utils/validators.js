const validator = require("validator");

const validateSignUpData = (req) =>{
    const {firstName , lastName , emailId , password } = req.body;
    if (!(firstName || lastName || emailId || password || userName)) {
        throw new Error("Please provide all user data !");
    }else if(!validator.isEmail(emailId)){
        throw new Error("Please provide a valid email address !");
    }else if(!validator.isStrongPassword(password)){
        throw new Error("Please enter a strong password !");
    }
}

const validateLoginData = (req) => {
    const {emailId, password} = req.body;
    if(!emailId || !password){
        throw new Error("Please provide Email and Password !");
    }
}

const validateUpdateData = (req) => {
    const userData = req.body;
    const allowedFieldsUpdate = ["about", "photoUrl", "age", "skills", "firstName", "lastName", "jobTitle", "location"];
    const isAllowedUpdates = Object.keys(userData).every((k) =>
        allowedFieldsUpdate.includes(k)
      );
      if (!isAllowedUpdates) {
        throw new Error("Update not allowed !");
      }
      return isAllowedUpdates;
}

const validatePostData = (req) =>{
    const {photoUrl, desc} = req.body;
    if(!photoUrl && !desc){
        throw new Error("Invalid data !");
    }
}

const validatePostUpdateData = (req) => {
    const postData = req.body;
    const allowedUpdates = ["desc", "keywords"];
    const isAllowedUpdates = Object.keys(postData).every((k) =>
        allowedUpdates.includes(k)
      );
    
    if(!isAllowedUpdates){
        throw new Error("Update not allowed !");
    }
    return isAllowedUpdates;
}
module.exports = {
    validateSignUpData, validateLoginData, validateUpdateData, validatePostData, validatePostUpdateData
}