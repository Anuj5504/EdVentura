import {Request,Response,NextFunction} from "express";
import ErrorHandler from "../utils/ErrorHandler";
import { catchAsyncError } from "../middleware/catchAsyncError";
import LayoutModel from "../models/layoutModel";
import cloudinary from "cloudinary";

export const createLayout=catchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const {type}=req.body;
        const isTypeExist=await LayoutModel.findOne({type});

        if(isTypeExist){
            return next(new ErrorHandler(`${type} already exists`,400));
        }
        
        if(type=="Banner") {
            const {image,title,subTitle}=req.body;
            const myCloud=await cloudinary.v2.uploader.upload(image,{
                folder:"layout"
            });
            const banner={
                image:{
                    public_id:myCloud.public_id,
                    url:myCloud.secure_url,
                },
                title,
                subTitle
            };

            await LayoutModel.create(banner);
        }
        else if(type=='FAQ') {
            const {faq}=req.body;
            const FaqItems  =await Promise.all(
                faq.map(async(item:any)=>{
                    return {
                        question:item.question,
                        answer:item.answer
                    }
                })
            )
            await LayoutModel.create({type:"FAQ",faq:FaqItems});
        }
        else if(type=='Categories') {
            const {categories}=req.body;
            const categoryItems      =await Promise.all(
                categories.map(async(item:any)=>{
                    return {
                        title:item.title,
                    }
                })
            )
            await LayoutModel.create({type:"Categories",categories:categoryItems});
        }
        else{
            return next(new ErrorHandler("Incorrect type",400));
        }

        res.status(200).json({
            success:true,
            message:"Layout created successfully",
        });
    } catch (error:any) {
        return next(new ErrorHandler(error.message,400));
    }
});

//edit layout

export const editLayout=catchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const {type}=req.body;
        
        if(type=="Banner") {
            const bannerData:any=await LayoutModel.findOne({type:"Banner"});
            const {image,title,subTitle}=req.body;
            await cloudinary.v2.uploader.destroy(bannerData.image.public_id);

            const myCloud=await cloudinary.v2.uploader.upload(image,{
                folder:"layout"
            });
            const banner={
                image:{
                    public_id:myCloud.public_id,
                    url:myCloud.secure_url,
                },
                title,
                subTitle
            };

            await LayoutModel.findByIdAndUpdate(bannerData._id,{banner});
        }
        else if(type=='FAQ') {
            const {faq}=req.body;
            const FaqItem=await LayoutModel.findOne({type:"FAQ"});
            const FaqItems  =await Promise.all(
                faq.map(async(item:any)=>{
                    return {
                        question:item.question,
                        answer:item.answer
                    }
                })
            )
            await LayoutModel.findByIdAndUpdate(FaqItem?._id,{type:"FAQ",faq:FaqItems});
        }
        else if(type=='Categories') {
            const {categories}=req.body;
            const categoriesData=await LayoutModel.findOne({type:"Categories"});
            const categoryItems=await Promise.all(
                categories.map(async(item:any)=>{
                    return {
                        title:item.title,
                    }
                })
            )
            await LayoutModel.findByIdAndUpdate(categoriesData?._id,{type:"Categories",categories:categoryItems});
        }
        else{
            return next(new ErrorHandler("Incorrect type",400));
        }

        res.status(200).json({
            success:true,
            message:"Layout updated successfully",
        });
    } catch (error:any) {
        return next(new ErrorHandler(error.message,400));
    }
});

//get layout by type

export const getLayoutByType=catchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const {type}=req.body;
        const layout=await LayoutModel.findOne({type});
        res.status(200).json({
            success:true,
            layout
        })
    } catch (error:any) {
        return next(new ErrorHandler(error.message,400));
    }
});