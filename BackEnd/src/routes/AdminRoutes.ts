import  express from "express";
import { adminLogin, deleteUser, getUserData } from "../controllers/AdminControllers";
import tokenVerify from "../middlewares/tokenVerify";




const adminRoutes=express.Router()


adminRoutes.post('/login',adminLogin)
adminRoutes.get('/dashboard',tokenVerify,getUserData)
adminRoutes.delete('/deleteuser/:id',tokenVerify,deleteUser)


export default adminRoutes