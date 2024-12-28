import { Request, Response, NextFunction } from "express";
import { catchAsyncError } from "../middleware/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import cloudinary from "cloudinary";
import { createCourse } from "../services/courseService";
import CourseModel from "../models/courseModel";
import { redis } from "../utils/redis";
import mongoose from "mongoose";
import ejs from "ejs";
import path from "path";
import sendMail from "../utils/sendMails";

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

export const getSingleCourse = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const courseId = req.params.id;

        const isCached = await redis.get(courseId);

        if (isCached) {
            console.log("cached");
            return res.status(200).json({
                success: true,
                course: JSON.parse(isCached)
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

export const getAllCourses = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const isCached = await redis.get("allcourses");
        if (isCached) {
            console.log("cached");
            return res.status(200).json({
                success: true,
                courses: JSON.parse(isCached)
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
});

//Get course content --only for purchased courses

export const getCourseByUser = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userCourseList = req.user?.courses;

        const courseId = req.params.id;
        const courseExist = userCourseList?.find((course: any) => course._id.toString() === courseId);
        if (!courseExist) {
            return next(new ErrorHandler('Your are not eligible for this course', 404));
        }
        const course = await CourseModel.findById(courseId);
        const content = course?.courseData;

        res.status(200).json({
            success: true,
            content
        });

    } catch (error: any) {
        return next(new ErrorHandler(error.messages, 400));
    }
});

//Add question to course
interface IQuestion {
    question: String;
    courseId: String;
    contentId: string;
}

export const addQuestion = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { question, courseId, contentId } = req.body as IQuestion;
        const course = await CourseModel.findById(courseId);
        if (!mongoose.Types.ObjectId.isValid(contentId)) {
            return next(new ErrorHandler('Invalid content id', 400));
        }

        const content = course?.courseData.find((item: any) => item._id.equals(contentId));

        if (!content) {
            return next(new ErrorHandler('Content not found', 404));
        }
        const newQuestion: any = {
            user: req.user,
            question,
            questionReplies: []
        }

        //add question to content
        content.questions.push(newQuestion);

        //save the updated course

        await course?.save();

        res.status(200).json({
            success: true,
            message: "Question added successfully",
            course
        });
    } catch (error: any) {
        return next(new ErrorHandler(error.messages, 400));

    }
});

//Answer

interface IAnswer {
    answer: String;
    courseId: String;
    contentId: string;
    questionId: string;
}

export const addAnswer = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { answer, courseId, contentId, questionId } = req.body as IAnswer;
        const course = await CourseModel.findById(courseId);
        if (!mongoose.Types.ObjectId.isValid(contentId) || !mongoose.Types.ObjectId.isValid(questionId)) {
            return next(new ErrorHandler('Invalid content id or question id', 400));
        }

        const content = course?.courseData.find((item: any) => item._id.equals(contentId));
        if (!content) {
            return next(new ErrorHandler('Content not found', 404));
        }

        const question = content.questions.find((item: any) => item._id.equals(questionId));
        if (!question) {
            return next(new ErrorHandler('Question not found', 404));
        }

        const newAnswer: any = {
            user: req.user,
            answer
        }

        question.questionReplies.push(newAnswer);

        await course?.save();

        if (req.user?._id.toString() !== question.user._id.toString()) {
            //send notification
            const data = {
                name: question.user.name,
                title: content.title,
                question,
            }
            const html = await ejs.renderFile(path.join(__dirname, '../mail/questionReply'), data);

            try {
                await sendMail({
                    email: question.user.email,
                    subject: 'Question Reply',
                    template: "questionReply.ejs",
                    data
                });
            }
            catch (error) {
                console.error('Error sending email:', error);
            }
        }
        else {
            //send notification to admin


        }

        res.status(200).json({
            success: true,
            message: "Answer added successfully",
            course
        });


    } catch (error: any) {
        return next(new ErrorHandler(error.messages, 400));
    }
})