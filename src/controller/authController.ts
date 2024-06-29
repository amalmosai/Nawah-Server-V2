import { NextFunction, Request ,Response} from "express";
import User from '../models/user';
import  Farmer from '../models/farmer';
import Engineer from '../models/engineer';
import asyncWrapper from '../middlewares/asynHandler';
import { createCustomError ,HttpCode} from "../errors/customError";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken";


export const register =  asyncWrapper(async (req: Request, res: Response , next:NextFunction) =>{
    const {fname ,lname ,email ,password ,role} = req.body;
    console.log(req.body)

    const [user, engineer, farmer] = await Promise.all([
        User.findOne({ email }),
        Engineer.findOne({ email }),
        Farmer.findOne({ email })
    ]);
    
    const emailAlreadyExists = user || engineer || farmer;

    if(emailAlreadyExists){
        return next(createCustomError('Email already Exists',HttpCode.BAD_REQUEST));
    }

    const hashPassword= await bcrypt.hash(password,10);
    let newUser;
    if (role === "engineer"){
        newUser = new Engineer({
            fname ,
            lname ,
            email ,
            password:hashPassword ,
            role
        });
    }else if (role === "farmer"){
        newUser = new Farmer({
            fname ,
            lname ,
            email ,
            password:hashPassword ,
            role
        });
    }else{
        newUser = new User({
            fname ,
            lname ,
            email ,
            password:hashPassword ,
            role
        });
    }

    console.log(newUser);
    const token= await generateToken({role:newUser.role,id:newUser._id});
    await newUser.save();

    res.status(201).json({
        sucess: true,
        data:newUser,
        message:'user sucessfully added',
        token:token
    });
}); 

export const login =  asyncWrapper(async (req: Request, res: Response , next:NextFunction) =>{
    const {email ,password} = req.body;
    console.log(req.body)

    if(!email || !password){
        return next(createCustomError(`Please provide email and password`, HttpCode.BAD_REQUEST));
    }

    const [user , engineer, farmer] = await Promise.all([
        User.findOne({ email }),
        Engineer.findOne({ email }),
        Farmer.findOne({ email })
    ]);
    const authUser = user || engineer || farmer;


    if(!authUser){
        return next(createCustomError(`Invalid Credentials email`, HttpCode.UNAUTHORIZED));
    }

    const isPasswordCorrect = await bcrypt.compare(password,authUser.password);
    
    if (!isPasswordCorrect) {
        return next(createCustomError(`Invalid Credentials password`, HttpCode.UNAUTHORIZED));
    }
    
    const tokenUser = await generateToken({role:authUser.role,id:authUser._id});

    console.log(authUser)
    // attachCookiesToResponse({ res, user: tokenUser });

    res.status(201).json({
        sucess: true,
        data:authUser,
        message:'user sucessfully login',
        token:tokenUser
    })

}); 

export const logout =  asyncWrapper(async (req: Request, res: Response , next:NextFunction) =>{

}); 



