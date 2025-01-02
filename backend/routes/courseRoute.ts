import express from "express";
import { addAnswer, addQuestion, addReply, addReview, deleteCourse, editCourse, getAllCourses, getCourseByUser, getSingleCourse, uploadCourse } from "../controllers/courseController";
import { authorizedRoles, isAuthenticated } from "../middleware/auth";
const courseRouter = express.Router();

courseRouter.post("/create-course", isAuthenticated,authorizedRoles("admin"),uploadCourse);

courseRouter.put("/edit-course/:id", isAuthenticated,authorizedRoles("admin"),editCourse);

courseRouter.get("/get-course/:id",getSingleCourse);

courseRouter.get("/get-all-courses",getAllCourses);

courseRouter.get("/get-course-content/",isAuthenticated,getCourseByUser);

courseRouter.put("/add-question",isAuthenticated,addQuestion);

courseRouter.put("/answer-question",isAuthenticated,addAnswer);

courseRouter.put("/add-review/:id",isAuthenticated,addReview);

courseRouter.put("/add-reply",isAuthenticated,authorizedRoles("admin"),addReply);

courseRouter.get("/get-courses",isAuthenticated,authorizedRoles("admin"),getAllCourses);

courseRouter.delete("/delete-course/:id",isAuthenticated,authorizedRoles("admin"),deleteCourse);

export default courseRouter;    