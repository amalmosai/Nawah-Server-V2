import {Types} from "mongoose";

export default interface IProduct {
    name:string;
    description:string;
    price:number;
    imageUrl:string;
    category:string;
    quantity:number;
    status:string;
    farmerId?:Types.ObjectId;
    rates?:number;
}