import dotenv from 'dotenv';
import mongoose from 'mongoose';
import LoggerService from './services/logger.service';
dotenv.config();
const logger = new LoggerService('config');

const PORT=process.env.PORT || 5001;
const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL as string);
        console.log('db connected')
        // logger.info('Db connected');
    }catch(err:any){
        console.log('An disconnected error occur')
        // logger.error(`An disconnected error occur`,err);
        process.exit(1);
    }
};

export default {
    connect: connectDB,
    port: PORT,
};