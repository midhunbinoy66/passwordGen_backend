import express, { Request, Response } from 'express';
import { loginContoller, registerController, storePasswordController } from '../controllers/userContoller';
import { authenticationToken } from '../helpers/userAuth';

const router = express.Router();


router.post('/login',(req:Request,res:Response)=>loginContoller(req,res))
router.post('/register',(req:Request,res:Response)=>registerController(req,res));
router.patch('/savepassword',authenticationToken,(req:Request,res:Response)=>storePasswordController(req,res))



export default router
