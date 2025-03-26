import  express from "express";
import { adminEditUser, adminLogin, deleteUser, getUserData } from "../controllers/AdminControllers";
import tokenVerify from "../middlewares/tokenVerify";




const adminRoutes=express.Router()


adminRoutes.post('/login',adminLogin)
adminRoutes.get('/dashboard',tokenVerify,getUserData)
adminRoutes.delete('/deleteuser/:id',tokenVerify,deleteUser)
adminRoutes.post('/edituser',tokenVerify,adminEditUser)

export default adminRoutes