import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET ='randomString'

export const authenticationToken = (req:Request,res:Response,next:NextFunction)=>{

    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({message:'Access Denied'})
    }

    try {
            const verified = jwt.verify(token,JWT_SECRET);
            next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid Token' });
    }
}