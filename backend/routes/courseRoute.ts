import express from "express";
import { addAnswer, addQuestion, editCourse, getAllCourses, getCourseByUser, getSingleCourse, uploadCourse } from "../controllers/courseController";
import { authorizedRoles, isAuthenticated } from "../middleware/auth";
const courseRouter = express.Router();

courseRouter.post("/create-course", isAuthenticated,authorizedRoles("admin"),uploadCourse);

courseRouter.put("/edit-course/:id", isAuthenticated,authorizedRoles("admin"),editCourse);

courseRouter.get("/get-course/:id",getSingleCourse);

courseRouter.get("/get-all-courses",getAllCourses);

courseRouter.get("/get-course-content/",isAuthenticated,getCourseByUser);

courseRouter.put("/add-question",isAuthenticated,addQuestion);

courseRouter.put("/answer-question",isAuthenticated,addAnswer);

export default courseRouter;