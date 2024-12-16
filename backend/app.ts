require("dotenv").config
import express, { NextFunction, Request, Response } from "express";
export const app=express();
import cookieParser from "cookie-parser";
import cors from "cors";
import { NewExpression } from "typescript";

app.use(express.json({limit:"50mb"}));

app.use(cookieParser());

app.use(cors({origin:process.env.ORIGIN}));

//testing api

app.get("/test",(req:Request, res:Response, next:NextFunction)=>{
    res.status(200).json({
        success:true,
        message:"API is working",
    });
});

app.all("*",(req:Request,res:Response,next:NextFunction)=>{
    const err=new Error(`Route ${req.originalUrl} not found`)
    next(err)
})
