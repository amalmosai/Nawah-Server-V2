import {Schema,model } from "mongoose";
import IEngineer from "../interfaces/Iengineer";

const engineerSchema = new Schema<IEngineer>(
    {
        fname: {
            type: String,
            required: [true, 'first Name is required'],
        },
        lname: {
            type: String,
            required: [true, 'last Name is required'],
        },
        email: {
            type: String,
            required: [true, 'Email address is required'],
            unique: true,
            validate :{
            validator: (value:string):boolean => {
                let pattern =/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
                return pattern.test(value);
            },
            message: 'Please fill a valid email address',
            }
        },
        password: {
            type: String,
            required: [true, 'Please provide password'],
        },
        phone: {
            type: Number,
        },
        address: {
            type: String,
        },
        img:{
            type:String,
            default:"avatar.jfif",
        },
        role:{
            type:String,
            default:"engineer",
            enum:{
                values:["admin","user",'farmer','engineer'],
                message:'{VALUE} is not supported',
            }
        },
        farmers:[{
            type: Schema.Types.ObjectId,
            ref:'farmers'
        }],
        license:{
            type:[String],
        },
    },
    {timestamps: true}
);

const Engineer = model<IEngineer>('engineers', engineerSchema);

export default Engineer;

