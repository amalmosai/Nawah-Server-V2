import {Types} from "mongoose";

export default interface IEngineer {
    fname: string;
    lname: string;
    email: string;
    password: string;
    phone?: number;
    address?: string;
    img?: string;
    role?: string;
    farmers?: Types.Array<object>;
    license?:Types.Array<string>;
};