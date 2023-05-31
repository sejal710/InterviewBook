const express = require("express");
const cors = require("cors");
const {connection} = require("./db")
const {userRouter} = require("./routes/user.routes")
const {authentication} = require("./middleware/authentication")
const {postRouter} = require("./routes/post.routes")
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors())


app.get("/",(req,res) => {
    res.send("Welcome TO THE HOME PAGE MY DEAR CREATING BY DEAR SEJAL")
})

app.use("/",userRouter)
// app.use(authentication)
app.use("/post",postRouter)

app.listen(process.env.PORT,async(req,res) => {
    console.log(`Server is runing in ${process.env.PORT}`);
    try{
        await connection;
        console.log("DB is connected");
    }
    catch(e){
        console.log("Error Messaage",e.message);
    }
})