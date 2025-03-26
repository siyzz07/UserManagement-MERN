import express from "express";

import { register,loginUser, homeGet, editUser } from "../controllers/UserControllers";
import upload from "../middlewares/MulterUpload";
import tokenVerify from "../middlewares/tokenVerify";
import multer from "multer";


const userRouter=express.Router()

userRouter.post("/register",upload.single("profile"),register)
userRouter.post("/login",loginUser)

userRouter.get('/home',tokenVerify,homeGet)

userRouter.post('/edituser',upload.single("profileImage"),tokenVerify,editUser)


export default userRouter