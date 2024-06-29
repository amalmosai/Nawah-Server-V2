import { Schema, model, Types } from "mongoose";
import IOrder from "../interfaces/iorder";
import User from "./user";
import Farmer from "./farmer";

const orderSchema = new Schema<IOrder>(
    {
        userId: { type: Schema.Types.ObjectId, refPath: 'onModel' },
        onModel: { type: String, enum: ['User', 'Farmer'] },
        orderItems: [
            {
                productId: { type: Schema.Types.ObjectId, ref: 'Product' },
                name: String,
                price: Number,
                amount: Number,
            },
        ],
        shippingFee: { 
            type: Number, 
            default: 500 
        },
        tax: { 
            type: Number, 
            default: 0 
        },
        subtotal: {
            type: Number,
            required: true,
        },
        total: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ['pending', 'failed', 'paid', 'delivered', 'canceled'],
            default: 'pending',
        },
        clientSecret: {
            type: String,
        },
        paymentIntentId: {
            type: String,
        },
    },
    { timestamps: true }
);

orderSchema.pre('validate', async function (next) {
    const order = this;

    if (order.userId) {
        let user;

        if (order.onModel === "User") {
            user = await User.findById(order.userId);
        } else if (order.onModel === "Farmer") {
            user = await Farmer.findById(order.userId);
        }

        if (!user) {
            throw new Error("User or Farmer not found");
        }
    }

    next();
});

const Order = model<IOrder>('orders', orderSchema);

export default Order;