import {Types} from "mongoose";

export default interface IUser {
    fname: string;
    lname: string;
    email: string;
    password: string;
    phone?: number;
    address?: string;
    img?: string;
    role?: string;
}