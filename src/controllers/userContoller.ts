import { Request, Response } from "express";
import { userModel } from "../model/userModel";
import bcrypt from 'bcrypt'
import jwt, { JwtPayload } from 'jsonwebtoken';


export const loginContoller =async(req:Request,res:Response)=>{

    try {
        const {email,password} = req.body;
        const user = await userModel.findOne({email:email})
        if(user && user.password){
            const valid  = await bcrypt.compare(password,user.password)
            if(valid){
                const JWT_SECRET = 'randomString'
                const token = jwt.sign(
                    { userId: user._id, email: user.email },
                    JWT_SECRET,
                    { expiresIn: '1h' } 
                );
                res.cookie('token', token, {
                    httpOnly: true,
                    secure: true, 
                    sameSite: 'none',
                  });
                return res.status(200).json({message:'Logged in',data:user})
            }else{
                return res.status(401).json({
                    message: 'Invalid email or password',
                });
            }
        }else{
            return res.status(401).json({
                message: 'Invalid email or password',
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error',
        });
    }


}

export const registerController = async(req:Request,res:Response)=>{

    try {
        const {userName,email,password} = req.body;
        const existing = await userModel.findOne({email});
        if(existing){
            return res.status(403).json({
                message: 'Email already Exist',
            });
        }else{
            const sPassword = await bcrypt.hash(password,10)
            const user = await userModel.create({
                userName:userName,
                email:email,
                password:sPassword
            })
    
            return res.status(200).json({message:'user registration Successful'})
    
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error',
        });
    }




}

export const storePasswordController = async(req:Request,res:Response)=>{

    try {
        const {passwordToStore} = req.body
        const token = req.cookies.token;
        const verified = jwt.verify(token,process.env.JWT_SECRET as string) as JwtPayload
        const user = await userModel.findById({_id:verified.userId})

        if(!passwordToStore){
            return res.status(500).json({
                message: 'Password not revceived',
            });
        }

        if(user){
            if(!user.storage.includes(passwordToStore)){
                user.storage.push(passwordToStore);
            }
            await user.save();
            return res.status(200).json({message:'Success',data:user.storage})

        }else{
            return res.status(401).json({
                message: 'Invalid token',
            });
        }

    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error',
        });
    }
    
}


export const deletePasswordController = async(req:Request,res:Response)=>{
    
}