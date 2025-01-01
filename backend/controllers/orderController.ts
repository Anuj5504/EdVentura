import { Request, Response, NextFunction } from "express";
import { catchAsyncError } from "../middleware/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import OrderModel, { IOrder } from "../models/orderModels";
import userModel from "../models/UserModel";
import CourseModel from "../models/courseModel";
import path from "path";
import ejs, { name } from "ejs";
import sendMail from "../utils/sendMails";
import NotificationModel from "../models/notificationModel";
import { getAllOrdersService, newOrder } from "../services/orderService";

//create order

export const createOrder = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { courseId, paymentInfo } = req.body as IOrder;

        const user = await userModel.findById(req.user?._id);

        const alreadyEnrolled = user?.courses.some((course: { courseId: string }) => 
            course.courseId === courseId
        );
        
        if (alreadyEnrolled) {
            return next(new ErrorHandler("You have already enrolled in this course", 400));
        }

        const course = await CourseModel.findById(courseId);

        if (!course) {
            return next(new ErrorHandler("Course not found", 404));
        }

        const data: any = {
            courseId: course._id,
            userId: req.user?.id,
            paymentInfo,
        }


        const mailData = {
            order: {
                _id: course._id.toString().slice(0, 6),
                name: course.name,
                price: course.price,
                date: new Date().toLocaleDateString('en-IN', {
                    timeZone: 'Asia/Kolkata',
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                }),
            }
        }

        const html = await ejs.renderFile(path.join(__dirname, "../mail/orderConfirmation.ejs"), { order: mailData });

        try {
            if (user) {
                await sendMail({
                    email: user.email,
                    subject: "Order Confirmation",
                    template: "orderConfirmation.ejs",
                    data: mailData
                });
            }
        }
        catch (error: any) {
            return next(new ErrorHandler(error.message, 500));
        }

        user?.courses.push({ courseId: course?._id.toString() });

        await user?.save();

        await NotificationModel.create({
            user: user?._id,
            title: "New Order Placed",
            message: `You have new ordered enrolled in ${course.name} course`
        });

        if (course.purchased) {
            course.purchased += 1;
        }
        await course?.save();

        newOrder(data, res, next);

    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
});

export const getAllOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
        getAllOrdersService(res);
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
};