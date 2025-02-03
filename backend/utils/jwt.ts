require('dotenv').config();
import { Response, Request, NextFunction } from "express";
import { IUser } from "../models/UserModel";
import { redis } from "./redis";

interface ITokenOptions {
    expires: Date;
    maxAge: number;
    httpOnly: boolean;
    sameSite: 'lax' | 'strict' | 'none' | undefined;
    secure?: boolean;
}

 // Parse environment variables for token expiration with fallback
 const accessTokenExpire = parseInt(process.env.ACCESS_TOKEN_EXPIRE || '300', 10);
 const refreshTokenExpire = parseInt(process.env.REFRESH_TOKEN_EXPIRE || '1200', 10);

 // Options for cookies
 export  const accessTokenOptions: ITokenOptions = {
     expires: new Date(Date.now() + accessTokenExpire * 1000 *3600),
     maxAge: accessTokenExpire * 1000 *3600,
     httpOnly: true,
     sameSite: 'lax',
     secure: process.env.NODE_ENV === 'production'
 };

 export const refreshTokenOptions: ITokenOptions = {
     expires: new Date(Date.now() + refreshTokenExpire *24* 1000 *3600),
     maxAge: refreshTokenExpire* 24 * 1000 *3600,
     httpOnly: true,
     sameSite: 'lax',
     secure: process.env.NODE_ENV === 'production'
 };

export const sendToken =  async (user: IUser, statusCode: number, res: Response) => {
    const accessToken = await user.signAccessToken();
    const refreshToken = await user.signRefreshToken();

    // Upload session to Redis
    await redis.set(user._id.toString(), JSON.stringify(user) as any);

    // Set cookies in the response
    res.cookie('access_token', accessToken, accessTokenOptions);
    res.cookie('refresh_token', refreshToken, refreshTokenOptions);
    // Send response
    res.status(statusCode).json({
        success: true,
        user,
        accessToken
    });
};