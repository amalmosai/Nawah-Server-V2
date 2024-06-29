import { Request, Response, NextFunction } from "express";
import asyncWrapper from '../middlewares/asynHandler';
import { HttpCode } from "../errors/customError";
import stripeClient from "../services/stripe.service";


export const createPaymentIntent = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {

    const {paymentMethod,total}=req.body;
    const paymentIntent = await stripeClient.paymentIntents.create({
        amount:total* 100, 
        currency:'egp',
        payment_method_types: ["card"],
        setup_future_usage: "on_session",
        payment_method: paymentMethod.paymentMethod.id,
        confirm: true,
        confirmation_method: 'manual',
    });

    res.status(HttpCode.OK).json({
        success: true,
        requires_action: true,
        payment_intent_client_secret: paymentIntent.client_secret,
        paymentIntent_id:paymentIntent.id,
        message: 'Payment requires authentication',
    });
});

