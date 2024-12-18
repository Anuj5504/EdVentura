import  express  from "express";
import { activateUser, loginUser, logout, registerationUser } from "../controllers/userController";
import { authorizedRoles, isAuthenticated } from "../middleware/auth";
const userRouter=express.Router();

userRouter.post('/registration',registerationUser);

userRouter.post('/activate-user',activateUser);

userRouter.post('/login',loginUser);

userRouter.get('/logout',isAuthenticated,authorizedRoles("admin"),logout);


export default userRouter;