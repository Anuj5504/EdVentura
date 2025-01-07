import { Request,Response,NextFunction } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import { catchAsyncError } from "../middleware/catchAsyncError";
import { generateLast12MonthsData } from "../utils/analyticsGenerator";
import userModel from "../models/UserModel";
import CourseModel from "../models/courseModel";
import OrderModel from "../models/orderModels";

//get user analytics admin only

export const getUserAnalytics=catchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const users=await generateLast12MonthsData(userModel);

        res.status(200).json({
            success:true,
            users,
        })
    } catch (error:any) {
        return next(new ErrorHandler(error.message,400));
    }
});

export const getCourseAnalytics=catchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const courses=await generateLast12MonthsData(CourseModel);

        res.status(200).json({
            success:true,
            courses,
        })
    } catch (error:any) {
        return next(new ErrorHandler(error.message,400));
    }
});

export const getOrderAnalytics=catchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const orders=await generateLast12MonthsData(OrderModel);

        res.status(200).json({
            success:true,
            orders,
        })
    } catch (error:any) {
        return next(new ErrorHandler(error.message,400));
    }
});

 