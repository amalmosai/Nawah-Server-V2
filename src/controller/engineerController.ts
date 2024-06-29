import { NextFunction, Request ,Response} from "express";
import User from '../models/user';
import  Farmer from '../models/farmer';
import Engineer from '../models/engineer';
import asyncWrapper from '../middlewares/asynHandler';
import { createCustomError ,HttpCode} from "../errors/customError";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken";
import IEngineer from "../interfaces/Iengineer";

export const addEngineer = asyncWrapper(async(req:Request , res:Response ,next:NextFunction)=>{
    console.log(req.body)
    const{
        fname,
        lname,
        email,
        password,
        phone,
        address,
        farmers,
        img,
        role,
        license
    } = req.body as IEngineer;

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

    const newEngineer= new Engineer({
        fname,
        lname,
        email,
        password:hashPassword,
        phone,
        address,
        img:avatar,
        farmers,
        role,
        license
    })
    console.log(newEngineer)

    const token= await generateToken({role:newEngineer.role,id:newEngineer._id});
    console.log(token)
    await newEngineer.save();

    res.status(201).json({
        success: true,
        data:newEngineer,
        message:'engineer sucessfully added',
        token:token
    });
});

export const getAllEngineers = asyncWrapper(async(req:Request , res:Response ,next:NextFunction)=>{
    const engineers = await Engineer.find({});
    // console.log(engineers)
    res.status(200).json({
        sucess: true,
        data:engineers,
        message:'get all engineers sucessfully',
    })
});

export const getEngineer = asyncWrapper(async(req:Request , res:Response ,next:NextFunction)=>{
    const id = req.params.id;
    const engineer = await Engineer.findById(id).
    populate({ path: 'farmers'});

    if(!engineer){
        return next(createCustomError(`No engineer with id : ${id}`,HttpCode.NOT_FOUND));
    }

    res.status(200).json({
        sucess: true,
        data:engineer,
        message:'get engineer sucessfully',
    });
});

export const updateEngineer = asyncWrapper(async(req:Request , res:Response ,next:NextFunction)=>{
    const engineerId = req.params.id;
    const engineer = await Engineer.findById(engineerId);
    
    if(!engineer){
        return next(createCustomError(`No engineer with id : ${engineerId}`,HttpCode.NOT_FOUND));
    };

    const{
        fname,
        lname,
        email,
        password,
        phone,
        address,
        farmers,
        img,
        role,
        license
    } = req.body as IEngineer;

    let avatar;
    if(req.file?.filename){
        avatar = req.file?.filename;
    }else{
        avatar=img;
    }
    
    const hashPassword= await bcrypt.hash(password,10);

    let updateEngineer = await Engineer.findByIdAndUpdate(
        engineerId,
        {
            fname,
            lname,
            email,
            password:hashPassword,
            phone,
            address,
            farmers,
            img:avatar,
            role,
            license
        },
        { new: true } 
    );
    console.log(updateEngineer);

    res.status(200).json({
        success: true,
        data:updateEngineer,
        message:'update engineer sucessfully',
    });
});

export const deleteEngineer = asyncWrapper(async(req:Request , res:Response ,next:NextFunction)=>{
    const id = req.params.id;
    console.log(req)
    const engineer = await Engineer.deleteOne({_id:id});
    if(!engineer){
        return next(createCustomError(`No engineer with id : ${id}`,HttpCode.NOT_FOUND));
    }
    
    res.status(200).json({
        sucess: true,
        data:engineer,
        message:'delete engineer sucessfully',
    });
});

export const addFarmerToEng = asyncWrapper(async(req:Request , res:Response ,next:NextFunction)=>{
    let engId =req.params.id;

    if(!engId){
        return next(createCustomError(`No engineer with id : ${engId}`,HttpCode.NOT_FOUND));
    };

    let engineer = await Engineer.findByIdAndUpdate(
        engId,
        {farmers:req.body.checkArray}
        );
        
        console.log(engineer);

    res.json({
        message: "farmers successfully added to engineer",
        status: 200,
        data: engineer,
        success: true,
    });
});



