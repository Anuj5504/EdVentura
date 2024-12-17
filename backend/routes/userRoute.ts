import  express  from "express";
import { activateUser, loginUser, logout, registerationUser } from "../controllers/userController";
const userRouter=express.Router();

userRouter.post('/registration',registerationUser);

userRouter.post('/activate-user',activateUser);

userRouter.post('/login',loginUser);

userRouter.get('/logout',logout);

export default userRouter;