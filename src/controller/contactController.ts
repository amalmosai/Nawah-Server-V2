import asyncWrapper from "../middlewares/asynHandler";
import { NextFunction, Request ,Response} from "express";
import  ContactMessage from '../models/contactMessage';
import IContactMessage from "../interfaces/icontactMessage";
import { HttpCode, createCustomError } from "../errors/customError";
import User from "../models/user";
import Engineer from "../models/engineer";
import Farmer from "../models/farmer";






export const addMessage = asyncWrapper(async(req:Request , res:Response ,next:NextFunction)=>{
    console.log('add message',req.body)
    const{
        email,
        contactMessage
    } = req.body as IContactMessage;


    const [user, engineer, farmer] = await Promise.all([
        User.findOne({ email }),
        Engineer.findOne({ email }),
        Farmer.findOne({ email })
    ]);
    
    const emailAlreadyExists = user || engineer || farmer;

    if(!emailAlreadyExists){
        return next(createCustomError('Email does not Exists',HttpCode.BAD_REQUEST));
    }
    const newMessage= new ContactMessage({
        email,
        contactMessage
    })
    await newMessage.save();
    console.log(newMessage);
    
    res.status(201).json({
        success: true,
        data:newMessage,
        message:'Message sucessfully sended'
    });

});

export const getAllMessages = asyncWrapper(async(req:Request , res:Response ,next:NextFunction)=>{
    const messages = await ContactMessage.find({});
    // console.log(messages)
    res.status(200).json({
        sucess: true,
        data:messages ,
        message:'get all messages  sucessfully',
    })
});