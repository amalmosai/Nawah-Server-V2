import { NextFunction, Request ,Response} from "express";
import Product from '../models/product'
import asyncWrapper from '../middlewares/asynHandler';
import { createCustomError ,HttpCode} from "../errors/customError";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken";
import IProduct from "../interfaces/Iproduct";


export const addPrd = asyncWrapper(async(req:Request ,res:Response ,next:NextFunction)=>{
    console.log(req.body)
    console.log('hellllllllllllllllo');
    const{
        name,
        description,
        price,
        imageUrl,
        category,
        quantity,
        status,
        farmerId,
    } = req.body as IProduct;

    let prdImg;
    if(req.file?.filename){
        prdImg = req.file?.filename;
    }else{
        prdImg=imageUrl;
    }
    

    const newProduct= new Product({
        name,
        description,
        price,
        imageUrl:prdImg,
        category,
        quantity,
        status,
        farmerId,
    })
    await newProduct.save();

    res.status(201).json({
        success: true,
        data:newProduct,
        message:'product sucessfully added',
    });
});

export const editPrd = asyncWrapper(async(req:Request ,res:Response ,next:NextFunction)=>{
    const productId = req.params.id;
    const product = await Product.findById(productId);
    
    if(!product){
        return next(createCustomError(`No product with id : ${productId}`,HttpCode.NOT_FOUND));
    };

    const{
        name,
        description,
        price,
        imageUrl,
        category,
        quantity,
        status,
    } = req.body as IProduct;

    
    let prdImg;
    if(req.file?.filename){
        prdImg = req.file?.filename;
    }else{
        prdImg=imageUrl;
    }

    let updateproduct = await Product.findByIdAndUpdate(
        productId,
        {
            name: name?name:product?.name,
            description : description?description:product?.description,
            price : price? price:product?. price,
            imageUrl:prdImg,
            category:category?category:product?.category,
            quantity:quantity?quantity:product?.quantity,
            status:status?status:product?.status,        
        },
        { new: true } 
    );
    console.log(updateproduct)

    res.status(200).json({
        success: true,
        data:updateproduct,
        message:'update product sucessfully',
    });
});

export const deletePrd = asyncWrapper(async(req:Request ,res:Response ,next:NextFunction)=>{
    const id = req.params.id;
    console.log(req)
    const product = await Product.deleteOne({_id:id});
    if(!product){
        return next(createCustomError(`No product with id : ${id}`,HttpCode.NOT_FOUND));
    }
    
    res.status(200).json({
        sucess: true,
        data:product,
        message:'delete product sucessfully',
    });
});

export const getPrd = asyncWrapper(async(req:Request ,res:Response ,next:NextFunction)=>{
    const id = req.params.id;
    const product = await Product.findById(id);

    if(!product){
        return next(createCustomError(`No product with id : ${id}`,HttpCode.NOT_FOUND));
    }

    res.status(200).json({
        sucess: true,
        data:product,
        message:'get product sucessfully',
    });
});

export const getAllPrds = asyncWrapper(async(req:Request ,res:Response ,next:NextFunction)=>{
    const Products = await Product.find({});
    // console.log(Products)
    res.status(200).json({
        sucess: true,
        data:Products,
        message:'get all Products sucessfully',
    });
});