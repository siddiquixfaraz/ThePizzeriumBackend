import express from "express";
import { user } from "../model/users.js";
import bcrypt from "bcrypt"
import { sendCookie } from "../utils/features.js";
import  jwt  from "jsonwebtoken";

const router = express.Router();

router.get("/",(req,res)=>{
    res.json({
        "message" : "CREATED SUCCESSFULLY"
    });
})

router.post("/login", async(req,res)=>{
   const {email, password} = req.body

   let User = await user.findOne({email}).select("+password")

   if(!User){
    return res.status(400).json({
        success: false,
        message:"Invalid email or password"
    })
   }

   const isMatch = await bcrypt.compare(password,User.password)

   if(!isMatch){
    return res.status(400).json({
        success: false,
        message:"Invalid email or password"
    })
   }

   sendCookie(res,User,200,`Welcome back ${User.name}`)
})

router.post("/register", async (req,res)=>{

    const {name , email , password} = req.body
    console.log(req.body);
    let User = await user.findOne({email})

    if(User){
       return res.status(400).json({
            success: false,
            message:"User already exist"
        })
    }

    const hashedPassword = await bcrypt.hash(password,10);
    User = await user.create({name,email,password: hashedPassword})

    sendCookie(res,User,201,"Account Created")
   
})

router.get("/logout", (req,res)=>{
    res.status(200).cookie("token","",{expires: new Date(Date.now())}
    ).json({
        success: true,
        message: "Logout Successfully"
    })
})

export default router;