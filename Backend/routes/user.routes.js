const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const {userModel} = require("../model/user.model");
const userRouter = express.Router();


userRouter.post("/register",async(req,res) => {
    const data = req.body;
    try{
        const password = data.password;
        delete data.password;
        bcrypt.hash(password,5,async(err,hash) => {
            if(err){
                res.send({Message:err.message})
            }
            else{
                const user = new userModel({password:hash,...data});
                await user.save()
                res.send({Message:`Registration Succesfully ${user.name}`})
            }
        })
    }
    catch(e){
        res.send({Message:e.message});
    }
})

userRouter.post("/login",async(req,res) => {
    const {email,password} = req.body
    try{
        const user = await userModel.find({email})
        if(user.length > 0){
            bcrypt.compare(password,user[0].password,function(err,result){
                if(result){
                    res.send({Message:`Login Succesfully ${user[0].name}`,ID:user[0]._id})
                }
                else{
                    res.send({Message:"Wrong Credential"})
                }
            })
        }
    }
    catch(e){
        res.send({Message:e.message});
    }
})

userRouter.patch("/:id", async (req, res) => {
    const id = req.params.id;
    const payload = req.body;
    try {
        if(Object.keys(payload).length !== 0){
            let data  = await userModel.findByIdAndUpdate({ _id: id }, payload);
            console.log("data",data);
            res.send({ Message: "Successfully Done🎉" });
        }
        else{
            res.send({Message : "Nothing to update"})
        }
    } catch (e) {
        console.log(e)
      res.send({ Message: e.message });
    }
  });
  

userRouter.get("/users",async(req,res) => {
    try{
        const users = await userModel.find();
        console.log(users)
        res.send({"Data":users})
    }
    catch(e){
        console.log(e);
        res.send({Message:e.message})
    }
})

userRouter.get("/:id",async(req,res) =>{
    const id = req.params.id;
    try{
        const user = await userModel.findById(id).populate("posts","title questions answers")
        if(!user){
            res.send({Data:"You are not a user"})
        }
        else res.send({Data:user})
    }
    catch(e){
        res.send({Message:e.message})
    }
})



module.exports = {userRouter}


// 6476c6e0e3d226b152691db7