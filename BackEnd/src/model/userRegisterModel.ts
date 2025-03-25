import mongoose, { Document, Schema, Model } from "mongoose";


interface IUserRegister extends Document {
  name: string;
  email: string;
  profileImage: object;
  password: string;
  createdAt: Date;
  isActive:Boolean;
  role:String;
}


const userSchema: Schema<IUserRegister> = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
 
  },
  profileImage: {
    type: Object,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date, 
    default: Date.now, 
  },
  isActive:{
    type:Boolean,
    default:true

  },
  role: {
    type: String,
    default: "User",
  },
});


const User: Model<IUserRegister> = mongoose.model<IUserRegister>("User", userSchema);

export default User;
