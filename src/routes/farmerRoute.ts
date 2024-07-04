import express from 'express';
import * as farmerController from '../controller/farmerController';
import {upload} from '../middlewares/uploadImage';
import { authenticateUser,authorizeRoles } from '../middlewares/auth';
const router = express.Router();


router.route('/')
            .post(
                    authenticateUser,
                    authorizeRoles('admin'),
                    upload.single('img'),
                    farmerController.addFarmer
                );

router.route('/')
            .get(farmerController.getAllFarmers);

router.route('/:id')
            .get(farmerController.getFarmer);

router.route('/addNote')
            .put(
                    authenticateUser,
                    authorizeRoles('engineer'),
                    farmerController.addNoteByEng
                );

router.route('/:id')
            .put(
                    authenticateUser,
                    authorizeRoles('admin','farmer'),
                    upload.single('img'),
                    farmerController.updateFarmer
                ); 
 

router.route('/:id')
            .delete(
                        authenticateUser,
                        authorizeRoles('admin'),
                        farmerController.deleteFarmer
                    );
            
export default router;  