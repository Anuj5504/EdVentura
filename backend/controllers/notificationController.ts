import NotificationModel from "../models/notificationModel";
import ErrorHandler from "../utils/ErrorHandler";
import { NextFunction,Request,Response } from "express";
import { catchAsyncError } from "../middleware/catchAsyncError";

//get all notifications
export const getNotifications = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const notifications=await NotificationModel.find().sort({createdAt:-1}); 

        res.status(200).json({
            success:true,
            notifications
        });

    } catch (error:any) {
        return next(new ErrorHandler(error.message, 500));
    }
});

export const updateNotificationStatus = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const notification = await NotificationModel.findById(req.params.id);
        if(notification){
            notification.status?notification.status='read':notification.status='unread';
        }

        await notification?.save();
        const notifications=await NotificationModel.find().sort({createdAt:-1});
         
        res.status(200).json({
            success:true,
            notification
        });

    } catch (error:any) {
        return next(new ErrorHandler(error.message, 500));
    }
});