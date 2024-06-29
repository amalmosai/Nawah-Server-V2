import express from 'express';
import * as userController from '../controller/userController';
import upload from '../middlewares/uploadImage';
import { authenticateUser,authorizeRoles } from '../middlewares/auth';
const router = express.Router();


router.route('/')
            .post(
                    authenticateUser,
                    authorizeRoles('admin'),
                    upload.single('img'),
                    userController.addUser
                );

router.route('/')
            .get(userController.getAllUsers);

router.route('/:id')
            .get(userController.getUser);

router.route('/:id')
            .put(
                    authenticateUser,
                    authorizeRoles('admin' ,'user'),
                    upload.single('img'),
                    userController.updateUser
                );            


router.route('/:id')
            .delete(
                        authenticateUser,
                        authorizeRoles('admin'),
                        userController.deleteUser
                    );
            
export default router;  