import multer,{FileFilterCallback} from 'multer';
import express,{NextFunction, Request} from 'express';
import path from 'path';
import cloudinary from '../utils/cloudinary';
import { HttpCode, createCustomError } from '../errors/customError';
const route = express.Router();
route.use(express.static('public/uploads'));

type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void


let filestorage = multer.diskStorage({
    destination: function (req:Request, file:Express.Multer.File, cb:DestinationCallback) {
        cb(null, 'public/uploads');
    },
    filename: function (req:Request, file:Express.Multer.File, cb:FileNameCallback) {
        const extension = path.extname(file.originalname);
        console.log(file.originalname)
        const filename = `${Date.now()}${extension}`;
        cb(null, filename);
    }
})


const multerFilter = function (req:Request, file:Express.Multer.File, cb:FileFilterCallback) {
    const acceptedMimetypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (acceptedMimetypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
        throw new Error("Not an accepted image format");
    }
};

export const upload = multer({
    storage:filestorage ,   
    fileFilter:multerFilter,
    
});


// interface CloudinaryFile extends Express.Multer.File{
//     buffer: Buffer;
//     cloudinaryUrl: string;
// };


// export const uploadToCloudinary = async (req:any, next:any) => {
//     try {
//         const file = req.file as CloudinaryFile;
//         const result = await cloudinary.uploader.upload(file.buffer, {
//             folder: 'nawah/images',
//             public_id: file.originalname,
//         });
//         file.cloudinaryUrl = result.secure_url;
//         next();
//     } catch (error) {
//         console.error(error);
//         return next(createCustomError('Error uploading file to Cloudinary',HttpCode.INTERNAL_SERVER_ERROR));
//     }
// };

