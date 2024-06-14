import mongoose, { Model, Schema } from "mongoose";
import { User } from "./interface/user";

const userSchema:Schema = new mongoose.Schema<User & Document>({
    userName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    
    email:{
        type:String,
        required:true
    },
    storage:{
        type:[String]
    }

})


export const userModel:Model<User & Document> = mongoose.model<User & Document>('user',userSchema) 