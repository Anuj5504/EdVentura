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

export const getAllCoursesService = async (res: Response) => { 
    try {
        const courses = await CourseModel.find().sort({ createdAt: -1 }); 

        res.status(200).json({
            success: true,
            courses 
        });
    } catch (error:any) {
        res.status(500).json({
            success: false,
            message: 'An error occurred while fetching courses.',
            error: error.message
        });
    }
};
