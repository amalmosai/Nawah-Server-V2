import IContactMessage from "../interfaces/icontactMessage";
import {Schema,model} from "mongoose";

const contactMessageSchema = new Schema<IContactMessage>({
    email:{
        type:String,
        required: [true, 'Email is required'],
    },
    contactMessage:{
        type:String,
        required: [true, 'Message is required'],
    }

}, {
    timestamps: true, 
    versionKey:false,
    strict:false,
})
const ContactMessage= model<IContactMessage>("contactMessage", contactMessageSchema )
export default  ContactMessage;