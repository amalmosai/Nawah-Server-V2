import {Schema,model} from "mongoose";
import IFarmer from "../interfaces/Ifarmer";

const farmerSchema = new Schema<IFarmer>(
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
        farmaddress: {
            type: String,
        },
        farmarea:{
            type: Number,
        },
        cropamount:{
            type: Number,
        },
        croptype:{
            type: String,
        },
        farmingExperience: {
            type: Number,
        },
        img:{
            type:String,
            default:"avatar.jfif",
        },
        notes:[{
            productId: {
                type: Schema.Types.ObjectId,
                ref:'products',
                required: true
            },
            note:{
                type:String,
            },
        }],
        role:{
            type:String,
            default:"farmer",
            enum:{
                values:["admin","user",'farmer','engineer'],
                message:'{VALUE} is not supported',
            }
        }
    },
    {timestamps: true}
);

const Farmer = model<IFarmer>('farmers', farmerSchema);

export default Farmer;

