import { NextFunction, Response } from "express";
import CourseModel from "../models/courseModel";
import { catchAsyncError } from "../middleware/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";

export const createCourse = catchAsyncError(async (data: any, res: Response, next: NextFunction) => {
    try {
        if (!data.name || !data.description || !data.price) {
            throw new Error("Missing required fields: name, description, or price");
        }

        const course = await CourseModel.create(data);

        res.status(200).json({
            success: true,
            course
        });
    } catch (error: any) {
        console.error("Error in createCourse:", error);
        next(new ErrorHandler(error.message || "Server Error", 400));
    }
});
