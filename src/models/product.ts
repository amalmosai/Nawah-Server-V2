import {Schema,model} from "mongoose";
import IProduct from "../interfaces/Iproduct";

const productSchema = new Schema<IProduct>(
    {
        name: {
        type: String,
        required: [true, 'Please provide product name'],
        minlength: 2,
        maxlength:[50, 'Name can not be more than 50 characters']
        },
        description: {
            type: String,
            required: [true, 'Please provide product description'],
            minlength: 10,
            maxlength: [500, 'Description can not be more than 500 characters'],
        },
        price: {
            type: Number,
            required: [true, 'Please provide product price'],
            default: 0,
        },
        imageUrl: {
            type: String,
            required:  [true, 'Please provide product image'],
            default: "http://localhost:5000/default.png"
        },
        category: {
            type: String,
            enum: ['dates','fertilizer', 'palm'],
            default: 'dates',
            required: [true, 'Please provide product category'],
        },
        quantity:{
            type:Number,
            required: true
        },
        status: {
            type: String,
            default: "pending",
            enum: {
                values: ['available','out of order','pending'],
            },
        },
        farmerId: {
            type: Schema.Types.ObjectId,
            ref:'farmers'
        },
        rates:{
            type: Number ,
            default: 1
        }
    },{timestamps: true}
);

const Product = model<IProduct>('products', productSchema);

export default Product;


