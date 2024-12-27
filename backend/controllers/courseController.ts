import { Request, Response, NextFunction } from "express";
import { catchAsyncError } from "../middleware/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import cloudinary from "cloudinary";
import { createCourse } from "../services/courseService";
import CourseModel from "../models/courseModel";
import { redis } from "../utils/redis";

export const uploadCourse = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {

    try {
        const data = req.body;
        const thumbnail = data.thumbnail;
        if (thumbnail) {
            const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
                folder: "courses"
            });

            data.thumbnail = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            };
        }

        await createCourse(data, res, next);

    } catch (error: any) {
        return next(new ErrorHandler(error.messages, 400));
    }
});

export const editCourse = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body;
        const thumbnail = data.thumbnail;
        if (thumbnail) {
            await cloudinary.v2.uploader.destroy(data.thumbnail.public_id);

            const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
                folder: "courses"
            });

            data.thumbnail = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            };
        }
        const courseId = req.params.id;
        const course = await CourseModel.findByIdAndUpdate(courseId, {
            $set: data
        },
            {
                new: true
            });

        res.status(200).json({
            success: true,
            course
        });


    } catch (error: any) {
        return next(new ErrorHandler(error.messages, 400));
    }
});

// /get single course-without purchasing

export const getSingleCourse = catchAsyncError(async (req: Request, res: Response, next: NextFunction) =>{
    try {
        const courseId=req.params.id;

        const isCached=await redis.get(courseId);

        if(isCached){
            console.log("cached");
            return res.status(200).json({
                success:true,
                course:JSON.parse(isCached)
            });
        }

        const course = await CourseModel.findById(req.params.id).select("-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links");

        await redis.set(courseId, JSON.stringify(course));
        
        res.status(200).json({
            success: true,
            course
        });
    } catch (error: any) {
        return next(new ErrorHandler(error.messages, 400));
    }
});

//get all courses without purchasing

export const getAllCourses = catchAsyncError(async (req: Request, res: Response, next: NextFunction) =>{
    try {
        const isCached=await redis.get("allcourses");
        if(isCached){
            console.log("cached");
            return res.status(200).json({
                success:true,
                courses:JSON.parse(isCached)
            });
        }
        
        const courses = await CourseModel.find().select("-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links");
        await redis.set("allcourses", JSON.stringify(courses));
        
        res.status(200).json({
            success: true,
            courses
        });
    } catch (error: any) {
        return next(new ErrorHandler(error.messages, 400));
    }
})