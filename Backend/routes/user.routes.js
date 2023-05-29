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
                    const token = jwt.sign({userID:user[0]._id},"sejal")
                    res.send({Message:`Login Succesfully ${user[0].name}`,Token:token,ID:user[0]._id})
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

userRouter.patch("/:id",async(req,res) => {
    const id = req.params.id;
    const payload = req.body;
    try{
        await userModel.findByIdAndUpdate({_id:id},payload)
        res.send({Message:"Successfully Done🎉"})
    }
    catch(e){
        res.send({Message:e.messages})
    }
})

userRouter.get("/users",async(req,res) => {
    try{
        const users = await userModel.find();
        res.send({"Data":users})
    }
    catch(e){
        res.send({Message:e.message})
    }
})

userRouter.get("/:id",async(req,res) =>{
    const id = req.params.id;
    try{
        const user = await userModel.findById(id)
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