import { NextFunction, Request ,Response} from "express";
import User from '../models/user';
import  Farmer from '../models/farmer';
import Engineer from '../models/engineer';
import asyncWrapper from '../middlewares/asynHandler';
import { createCustomError ,HttpCode} from "../errors/customError";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken";
import IUser from "../interfaces/Iuser";
import LoggerService from "../services/logger.service";

const logger = new LoggerService('user.controller');

export const addUser = asyncWrapper(async(req:Request , res:Response ,next:NextFunction)=>{
    console.log(req.body)
    const{
        fname,
        lname,
        email,
        password,
        phone,
        address,
        img,
        role
    } = req.body as IUser;

    let avatar;
    if(req.file?.filename){
        avatar = req.file?.filename;
    }else{
        avatar=img;
    }
    
    const [user, engineer, farmer] = await Promise.all([
        User.findOne({ email }),
        Engineer.findOne({ email }),
        Farmer.findOne({ email })
    ]);
    
    const emailAlreadyExists = user || engineer || farmer;

    if(emailAlreadyExists){
        return next(createCustomError('Email already Exists',HttpCode.BAD_REQUEST));
    }

    if(!password){
        return next(createCustomError('password is required',HttpCode.BAD_REQUEST));
    }

    const hashPassword= await bcrypt.hash(password,10);

    const newUser= new User({
        fname,
        lname,
        email,
        password:hashPassword,
        phone,
        address,
        img:avatar,
        role
    });
    console.log(newUser)

    const token= await generateToken({role:newUser.role,id:newUser._id});
    console.log(token)
    await newUser.save();

    res.status(201).json({
        success: true,
        data:newUser,
        message:'user sucessfully added',
        token:token
    });
});

export const getAllUsers = asyncWrapper(async(req:Request , res:Response ,next:NextFunction)=>{
    const users = await User.find({});
    // logger.info("return a list of user",users);
    res.status(200).json({
        sucess: true,
        data:users,
        message:'get all users sucessfully',
    });
});

export const getUser = asyncWrapper(async(req:Request , res:Response ,next:NextFunction)=>{
    const id = req.params.id;
    const user = await User.findById(id);

    if(!user){
        return next(createCustomError(`No user with id : ${id}`,HttpCode.NOT_FOUND));
    }

    res.status(200).json({
        sucess: true,
        data:user,
        message:'get user sucessfully',
    });
});

export const updateUser = asyncWrapper(async(req:Request , res:Response ,next:NextFunction)=>{
    
    const userId = req.params.id;
    const user = await User.findById(userId);
    console.log(userId)
    console.log(req.body)
    if(!user){
        return next(createCustomError(`No user with id : ${userId}`,404));
    };

    const{
        fname,
        lname,
        email,
        password,
        phone,
        address,
        img,
        role
    } = req.body;

    let avatar;
    if(req.file?.filename){
        avatar = req.file?.filename;
    }else{
        avatar=img;
    };

    let hashPassword;
    if(password){
        hashPassword= await bcrypt.hash(password,10);
    }

    let updateUser = await User.findByIdAndUpdate(
        userId,
        {
            fname:fname?fname:(user.fname),
            lname:lname?lname:(user.lname),
            email:email?email:(user.email),
            password:password?hashPassword:(user.password),
            phone,
            address,
            img:avatar,
            role
        },
        { new: true } 
    );
    console.log(updateUser)

    res.status(200).json({
        success: true,
        data:updateUser,
        message:'update user sucessfully',
    });
});

export const deleteUser = asyncWrapper(async(req:Request , res:Response ,next:NextFunction)=>{
    const id = req.params.id;
    console.log(req)
    const user = await User.deleteOne({_id:id});
    if(!user){
        return next(createCustomError(`No user with id : ${id}`,HttpCode.NOT_FOUND));
    }
    
    res.status(200).json({
        sucess: true,
        data:user,
        message:'delete user sucessfully',
    });
});


