import Stripe from "stripe";
import dotenv from 'dotenv';
dotenv.config();

const stripeClient = new Stripe(`${process.env.STRIPE_SECRET_KEY}`, {
    apiVersion: '2024-04-10',
});

export default stripeClient;