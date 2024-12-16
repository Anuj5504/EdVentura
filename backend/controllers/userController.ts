require("dotenv").config()
import { Request,Response,NextFunction } from "express";
import userModel,{IUser} from "../models/UserModel";
import ErrorHandler from "../utils/ErrorHandler";
import { catchAsyncError } from "../middleware/catchAsyncError";
import jwt, { Secret } from "jsonwebtoken"
import path from "path";
import ejs from "ejs";
import sendMail from "../utils/sendMails";

//register User

interface IRegister{
    name:string,
    email:string,
    password:string
    avatar?:string
}

export const registerationUser=catchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const {name,email,password}=req.body;

        const isEmailExist=await userModel.findOne({email})
        if(isEmailExist) {
            return next(new ErrorHandler("Email already Exist",400))
        }

        const user:IRegister={
            name,
            email,
            password
        }

        const activationToken=createActivationToken(user);

        const activationCode=activationToken.activationCode
        const data={user:{name:user.name},activationCode}
        const html = await ejs.renderFile(path.join(__dirname,"../mail/activationMail.ejs"),data)

        try {
            await sendMail({
                email:user.email,
                subject:"Active your account",
                template:"activationMail.ejs",
                data
            })

            res.status(201).json({
                success:true,
                message:"Please check your email to activate account",
                activationToken:activationToken.token
            })
        } catch (error:any) {
            return next(new ErrorHandler(error.message,400))
        }

    } catch (error:any) {
        return next(new ErrorHandler(error.message,400))
    }
})

interface IActivationToken{
    token:string,
    activationCode:string
}

export const createActivationToken=(user:any):IActivationToken=>{
    const activationCode=Math.floor(1000 + Math.random() *9000).toString();

    const token=jwt.sign({
        user,activationCode
    },process.env.ACTIVATION_SECRET as Secret,{
        expiresIn:"10m",
    })

    return {token,activationCode};
}