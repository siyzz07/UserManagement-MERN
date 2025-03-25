import express from "express";

import { register,loginUser, homeGet } from "../controllers/UserControllers";
import upload from "../middlewares/MulterUpload";
import tokenVerify from "../middlewares/tokenVerify";


const userRouter=express.Router()

userRouter.post("/register",upload.single("profile"),register)
userRouter.post("/login",loginUser)

userRouter.get('/home',tokenVerify,homeGet)


export default userRouter