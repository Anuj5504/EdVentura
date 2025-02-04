import { Response } from "express";
import userModel from "../models/UserModel"
import { redis } from "../utils/redis";


export const getUserById = async (id: string, res: Response) => {
    const userJson = await redis.get(id);
    if (userJson) {
        const user = JSON.parse(userJson);
        res.status(200).json({
            success: true,
            user,
        })
    }
};

//Get all users
export const getAllUsersService = async (res: Response) => {
    try {
        const users = await userModel.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            users
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        })

    }
};

//update user role

export const updateUserRoleService = async (id: string, role: string, res: Response) => {
    const user=await userModel.findByIdAndUpdate(id,{role},{new:true});

    res.status(201).json({
        success:true,
        user
    })
};
