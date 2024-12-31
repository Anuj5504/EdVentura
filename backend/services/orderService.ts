import { NextFunction,Response } from "express";
import { catchAsyncError } from "../middleware/catchAsyncError";
import OrderModel from "../models/orderModels";

//create New order

export const newOrder=catchAsyncError(async(data:any,res:Response,next:NextFunction)=>{
    const order=await OrderModel.create(data);
    
    
    res.status(201).json({
        success: true,
        message: "Order placed successfully",
        order,
    });

})