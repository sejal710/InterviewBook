const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    name:{type:String,unique:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true,unique:true},
    image:{type:String},
    profession:{type:String},
    skills:{type:String},
    video:{  type: String }
},{
    versionKey:false
})

const userModel = mongoose.model("user",userSchema);

module.exports = {userModel};