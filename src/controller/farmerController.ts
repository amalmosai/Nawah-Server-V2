import { NextFunction, Request ,Response} from "express";
import Farmer from '../models/farmer';
import Engineer from "../models/engineer";
import User from "../models/user";
import asyncWrapper from '../middlewares/asynHandler';
import { createCustomError ,HttpCode} from "../errors/customError";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken";
import IFarmer from "../interfaces/Ifarmer";

export const addFarmer = asyncWrapper(async(req:Request , res:Response ,next:NextFunction)=>{
    console.log(req.body)
    const{
        fname,
        lname,
        email,
        password,
        phone,
        address,
        farmaddress,
        farmarea,
        cropamount,
        croptype,
        farmingExperience,
        img,
        notes,
        role,
    } = req.body as IFarmer;

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

    const newFarmer= new Farmer({
        fname,
        lname,
        email,
        password:hashPassword,
        phone,
        address,
        farmaddress,
        farmarea,
        cropamount,
        croptype,
        farmingExperience,
        img:avatar,
        notes,
        role,
    })
    console.log(newFarmer)

    const token= await generateToken({role:newFarmer.role,id:newFarmer._id});
    console.log(token)
    await newFarmer.save();

    res.status(201).json({
        success: true,
        data:newFarmer,
        message:'farmer sucessfully added',
        token:token
    });
});

export const getAllFarmers = asyncWrapper(async(req:Request , res:Response ,next:NextFunction)=>{
    const users = await Farmer.find({});
    // console.log(users)
    res.status(200).json({
        sucess: true,
        data:users,
        message:'get all farmers sucessfully',
    })
});

export const getFarmer = asyncWrapper(async(req:Request , res:Response ,next:NextFunction)=>{
    const id = req.params.id;
    const user = await Farmer.findById(id).
    populate({path:'notes.productId'});

    if(!user){
        return next(createCustomError(`No farmer with id : ${id}`,HttpCode.NOT_FOUND));
    }

    res.status(200).json({
        sucess: true,
        data:user,
        message:'get farmer sucessfully',
    });
});

export const updateFarmer = asyncWrapper(async(req:Request , res:Response ,next:NextFunction)=>{
    const farmerId = req.params.id;
    const farmer:IFarmer | null = await Farmer.findById(farmerId);
    console.log(farmerId)
    if(!farmer){
        return next(createCustomError(`No farmer with id : ${farmerId}`,HttpCode.NOT_FOUND));
    };

    const{
        fname,
        lname,
        email,
        password,
        phone,
        address,
        farmaddress,
        farmarea,
        cropamount,
        croptype,
        farmingExperience,
        img,
        notes,
        role,
    } = req.body as IFarmer;

    let avatar;
    if(req.file?.filename){
        avatar = req.file?.filename;
    }else{
        avatar=img;
    }

    const hashPassword= await bcrypt.hash(password,10);

    let updateFarmer = await Farmer.findByIdAndUpdate(
        farmerId,
        {
            fname:fname?fname:(farmer.fname),
            lname:lname?lname:(farmer.lname),
            email:email?email:(farmer.email),
            password:password?hashPassword:(farmer.password),
            phone,
            address,
            farmaddress,
            farmarea,
            cropamount,
            croptype,
            farmingExperience,
            img:avatar,
            notes,
            role,
        },
        { new: true } 
    );
    console.log(updateFarmer);

    res.status(200).json({
        success: true,
        data:updateFarmer,
        message:'update farmer sucessfully',
    });
});

export const addNoteByEng = asyncWrapper(async(req:Request , res:Response ,next:NextFunction)=>{
    const {note, farmerId ,productId} = req.body;
    console.log(req.body)
    const farmer:IFarmer | null = await Farmer.findById(farmerId);
    
    if(!farmer){
        return next(createCustomError(`No farmer with id : ${farmerId}`,HttpCode.NOT_FOUND));
    };

    let updateFarmer= await Farmer.findOneAndUpdate(
        {_id : farmerId},
        { 
            $push: {
                "notes":[{ 
                    "productId":productId,
                    "note":note, 
                }]
            } 
        },
        {new:true}
    );

    res.status(200).json({
        sucess: true,
        data:updateFarmer,
        message:'note added sucessfully',
    });

})

export const deleteFarmer = asyncWrapper(async(req:Request , res:Response ,next:NextFunction)=>{
    const id = req.params.id;
    console.log(req)
    const farmer = await Farmer.deleteOne({_id:id});
    if(!farmer){
        return next(createCustomError(`No farmer with id : ${id}`,HttpCode.NOT_FOUND));
    }
    
    res.status(200).json({
        sucess: true,
        data:farmer,
        message:'delete farmer sucessfully',
    });
});


