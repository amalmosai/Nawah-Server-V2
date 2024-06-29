import {Types} from "mongoose";

export default interface IFarmer {
    fname: string;
    lname: string;
    email: string;
    password: string;
    phone?: number;
    address?: string;
    farmaddress?: string;
    farmarea?: number;
    cropamount?: number;
    croptype?: string;
    farmingExperience?: number;
    img?: string;
    notes?: Types.Array<object>;
    role?: string;
}