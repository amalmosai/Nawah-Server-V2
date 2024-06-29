import {Types} from "mongoose";

export default interface IOrder {
    userId: Types.ObjectId;
    onModel: "User" | "Farmer";
    orderItems: Array<{
        productId: Types.ObjectId;
        name: string;
        price: number;
        amount: number;
    }>;
    shippingFee: number;
    tax: number;
    subtotal: number;
    total:number;
    status:string;
    clientSecret: String;
    paymentIntentId : String;
}