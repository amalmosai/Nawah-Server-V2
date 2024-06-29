import { NextFunction, Request ,Response} from "express";
import asyncWrapper from '../middlewares/asynHandler';
import { createCustomError ,HttpCode} from "../errors/customError";
import Product from "../models/product";
import Order from "../models/order";
import User from "../models/user";
import Farmer from "../models/farmer";


export const createOrder = asyncWrapper(async(req:Request , res:Response ,next:NextFunction)=>{
  const{ 
    items:cartItems,
    shippingFee,
    tax,
    paymentIntentId , 
    clientSecret,
    status
  } = req.body;
  console.log(req.body)
  
  let _id = req.body.authUser.id;
  const [user , farmer] = await Promise.all([
    User.findOne({_id}),
    Farmer.findOne({_id})
  ]);
  const authUser = user|| farmer;

  if (!cartItems || cartItems.length < 1) {
    return next(createCustomError('No cart items provided',HttpCode.BAD_REQUEST));
  };

  if (!authUser) {
    return next(createCustomError("User not found", HttpCode.NOT_FOUND));
  }
  if (!tax || !shippingFee) {
    return next(createCustomError('Please provide tax and shipping fee',HttpCode.BAD_REQUEST));
  };

  let orderItems:any = [];
  let subtotal = 0;

  for (const item of cartItems) {
    const dbProduct = await Product.findOne({ _id: item.productId });
    if (!dbProduct) {
      return next(createCustomError(`No product with id : ${item.productId}`,HttpCode.NOT_FOUND));
    }

    const { name, price, _id } = dbProduct;
    const singleOrderItem = {
      amount: item.amount,
      name,
      price,
      productId: _id,
    };
    orderItems = [...orderItems, singleOrderItem];

    subtotal += item.amount * price;
  }

  const total = tax + shippingFee + subtotal;

  const newOrder= new Order({
    userId:authUser._id,
    onModel:authUser.role ==='farmer'?'Farmer':'User',
    orderItems,
    shippingFee,
    tax,
    subtotal,
    total,
    status,
    paymentIntentId , 
    clientSecret
  });
  console.log(newOrder)
  await newOrder.save();

  res.status(201).json({
    success: true,
    data:newOrder,
    message:'order sucessfully created',
  });

});



export const getOrder = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
  const orderId = req.params.id;
  const order = await Order.findById(orderId);

  if (!order) {
    return next(createCustomError(`No order with id : ${orderId}`, HttpCode.NOT_FOUND));
  };

  res.status(HttpCode.OK).json({
    success: true,
    data: order,
    message: "Get Order successfully",
  });
});

export const getOrdersForUser = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.id;
  if (!userId) {
    return next(createCustomError(`No user with id : ${userId}`, HttpCode.NOT_FOUND));
  };

  const orders = await Order.find({ userId });

  res.status(HttpCode.OK).json({
    success: true,
    data: orders,
    message: "Get Orders For User successfully",
  });
});

export const getAllOrders = asyncWrapper(async(req:Request , res:Response ,next:NextFunction)=>{
  const orders = await Order.find({});

  res.status(HttpCode.OK).json({
      sucess: true,
      data:orders,
      message:'get all orders sucessfully',
  });

});

export const deleteOrder = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
  const orderId = req.params.id;
  const order = await Order.findByIdAndDelete(orderId);

  if (!order) {
    return next(createCustomError(`No order with id : ${orderId}`, HttpCode.NOT_FOUND));
  }

  res.status(200).json({
    success: true,
    data: order,
    message: "Order deleted successfully",
  });
});

export const updateOrder = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
  
  const orderId = req.params.id;
  const order = await Order.findById(orderId);
  const { paymentIntentId , clientSecret ,status} = req.body;

  if (!order) {
    return next(createCustomError(`No order with id : ${orderId}`, HttpCode.NOT_FOUND));
  };
  
  let updatedOrder = await Order.findByIdAndUpdate(
    orderId,
    {
      status,
      clientSecret,
      paymentIntentId
    },
    { new: true } 
  );

  res.status(HttpCode.OK).json({
    success: true,
    data:updatedOrder,
    message:'updated order sucessfully',
  });
});



