import {Schema,model ,Types} from "mongoose";
import IUser from "../interfaces/Iuser";


const userSchema = new Schema<IUser>(
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
            default:"user",
            enum:{
                values:["admin","user",'farmer','engineer'],
                message:'{VALUE} is not supported',
            }
        }
    },
    {timestamps: true}
);

const User = model<IUser>('users', userSchema);
export default User ;