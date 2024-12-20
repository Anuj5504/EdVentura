require('dotenv').config();
import mongoose, { model, Types } from "mongoose";
import { Document, Model, Schema } from "mongoose";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

const emailPattern: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export interface IUser extends Document {
    _id: Types.ObjectId;
    name: string;
    email: string;
    password: string;
    avatar: {
        public_id: string;
        url: string;
    };
    role: string;
    isVerified: boolean;
    courses: Array<{
        courseId: string;
    }>;
    comparePassword: (password: string) => Promise<boolean>;
    signAccessToken:()=>string;
    signRefreshToken:()=>string;
}

const userSchema: Schema<IUser> = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Your Name."]
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email."],
        validate: {
            validator: function (value: string) {
                return emailPattern.test(value)
            },
            message: "Please enter valid email"
        },
        unique: true
    },
    password: {
        type: String,
        // required: [true, "Please Enter Your Password."],
        minlength: [6, "Password must be at least 6 characters"],
        select: false
    },
    avatar: {
        public_id: String,
        url: String
    },
    role: {
        type: String,
        default: "user"
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    courses: [
        {
            courseId: String,
        }
    ]
}, { timestamps: true })


userSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password')) {
        return next(); 
    }

    this.password = await bcrypt.hash(this.password, 10);

    next(); 
});

//sign in access token
userSchema.methods.signAccessToken=async function() {
    return jwt.sign({id:this._id},process.env.ACCESS_TOKEN || '',{expiresIn:"5m"});
}
userSchema.methods.signRefreshToken=async function() {
    return jwt.sign({id:this._id},process.env.REFRESH_TOKEN || '',{expiresIn:"3d"});
}

userSchema.methods.comparePassword=async function (enteredPassword:string): Promise<boolean> {
    return await bcrypt.compare(enteredPassword,this.password)
}

const userModel:Model<IUser>=mongoose.model("User",userSchema);
export default userModel;
