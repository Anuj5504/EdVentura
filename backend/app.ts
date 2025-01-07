require("dotenv").config
import express, { NextFunction, Request, Response } from "express";
export const app = express();
import cookieParser from "cookie-parser";
import cors from "cors";
import { ErrorMiddleware } from "./middleware/error";
import userRouter from "./routes/userRoute";
import courseRouter from "./routes/courseRoute";
import orderRouter from "./routes/orderRoutes";
import notificationRouter from "./routes/notificationRoutes";
import analyticsRouter from "./routes/analyticsRoute";

app.use(express.json({ limit: "100mb" }));

app.use(cookieParser());

app.use(cors({ origin: process.env.ORIGIN }));

//routes
app.use("/api/v1", userRouter,courseRouter,orderRouter,notificationRouter,analyticsRouter);

//testing api
app.get("/test", (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
        success: true,
        message: "API is working",
    });
});

app.all("*", (req: Request, res: Response, next: NextFunction) => {
    const err = new Error(`Route ${req.originalUrl} not found`)
    next(err)
})

app.use(ErrorMiddleware);
