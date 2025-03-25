import { Request, Response } from "express";
import User from "../model/userRegisterModel";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt";
import jwt from "jsonwebtoken";
import { log } from "console";

// ---------------------- REGISTER USER --------------------------------
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const userExist = await User.findOne({ email });
    if (userExist) {
      return void res.status(409).json({ message: "User already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const profile = req.file ? `/uploads/${req.file.filename}` : " ";

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashPassword,
      profileImage: profile,
    });

    const userData = await newUser.save();
    console.log(userData);

    if (userData) {
      res.status(201).json({ message: "User created successfully", userData });
    } else {
      res.status(500).json({ message: "registration failed" });
    }
  } catch (error: any) {
    console.log(error.message);
  }
};

//-------------------- LOGIN USER ----------------------------------

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    // check the user is exist
    const user = await User.findOne({ email: email });
    if (!user) {
      return void res
        .status(400)
        .json({ message: "User not found please register" });
    }
    if(!user.isActive){
      return void res
      .status(400)
      .json({ message: "Your accound is blocked by admin" });
    }

    // check the passwored is match or not
    const matchPass = await bcrypt.compare(password, user.password);
    if (!matchPass) {
      return void res.status(400).json({ message: "worong password" });
    }

    const token = generateToken({
      _id: String(user._id),
      role: String(user.role),
    });
    res.json({
      token,
      user: {
        id: String(user._id),
        email: String(user.email),
        name: user.name,
        role: user.role,
      },
    });
  } catch (error: any) {}
};

//----------------------------- GET HOME --------------------------------------------
export const homeGet = async (req: Request, res: Response): Promise<any> => {
  
  try {
    
    
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
     
      return void res.status(401).json({ message: "access denied" });
    }

    const decode: any = await jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string
    );
    
   
    if (!decode) {
     
      return void res.status(401).json({ message: "access denied" });
    }
    if(decode.role!=="User"){
      
      
      return  res
      .status(401)
      .json({ message: "access denied" });

    }

    const user = await User.findById(decode._id).select("-password");

   
    res.json(user);
  } catch (error: any) {
    console.log(error.message);
  }
};
