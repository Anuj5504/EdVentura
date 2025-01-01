import NotificationModel from "../models/notificationModel";
import ErrorHandler from "../utils/ErrorHandler";
import { NextFunction,Request,Response } from "express";
import { catchAsyncError } from "../middleware/catchAsyncError";
import cron from 'node-cron';

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

//DELETE notification

cron.schedule('0 0 * * *', async () => {
    const date = new Date(Date.now() - 24 * 60 * 60 * 1000);
    await NotificationModel.deleteMany({status:"read",createdAt:{$lt:date}});
}); 