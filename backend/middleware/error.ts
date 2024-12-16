import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/ErrorHandler";

export const ErrorMiddleware= (error: any, req: Request, res: Response, next: NextFunction) => {
    error.statusCode = error.statusCode || 500
    error.message = error.message || 'Internal server error'

    if (error.name == 'CastError') {
        const message = `Resource not found. Invalid: ${error.path}`
        error = new ErrorHandler(message, 400);
    }

    if (error.name == 'JsonWebTokenError') {
        const message = 'JsonWebToken is invalid.'
        error = new ErrorHandler(message, 400);
    }

    if (error.name == 'TokenExpiredError') {
        const message = 'JsonWebToken is expired.'
        error = new ErrorHandler(message, 400);
    }

    res.status(error.statusCode).json({
        success: false,
        message: error.message
    })
}
