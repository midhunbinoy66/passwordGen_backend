import express from 'express';
import cors from 'cors'
import * as path from 'path';
import router from './routes/userRoutes';
import * as dotenv from 'dotenv';
dotenv.config();
import { connectDb } from './config/db';
import cookieParser from 'cookie-parser'



connectDb().then(
    ()=>{
        const app = express();
        app.use(express.json());       
        app.use(cookieParser());
        app.use(cors({
            origin:process.env.CORS_URI,
            credentials:true
        }));
        
        

        app.use('/user',router)
        
        
        app.listen(3000,()=>console.log('listening on port 3000'))
    }
)

