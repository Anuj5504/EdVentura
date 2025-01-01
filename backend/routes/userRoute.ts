import  express  from "express";
import { activateUser, getUserInfo, loginUser, logout, registerationUser, socialAuth, updateAccessToken, updatePassword, updateProfilePicture, updateUserInfo } from "../controllers/userController";
import { authorizedRoles, isAuthenticated } from "../middleware/auth";
import { getAllCoursesAuth } from "../controllers/courseController";
const userRouter=express.Router();

userRouter.post('/registration',registerationUser);

userRouter.post('/activate-user',activateUser);

userRouter.post('/login',loginUser);

userRouter.get('/logout',isAuthenticated,logout);

userRouter.get('/refresh-token',updateAccessToken);

userRouter.get('/me',isAuthenticated,getUserInfo);

userRouter.post('/social-auth',socialAuth);

userRouter.put('/update-user-info',isAuthenticated,updateUserInfo);

userRouter.put('/update-password',isAuthenticated,updatePassword);

userRouter.put('/update-avatar',isAuthenticated,updateProfilePicture);

userRouter.get('/get-all-users',isAuthenticated,authorizedRoles("admin"),getAllCoursesAuth);



export default userRouter;