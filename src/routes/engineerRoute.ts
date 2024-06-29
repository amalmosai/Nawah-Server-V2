import express from 'express';
import * as engineerController from '../controller/engineerController';
import upload from '../middlewares/uploadImage';
import { authenticateUser,authorizeRoles } from '../middlewares/auth';
const router = express.Router();


router.route('/')
            .post(
                    authenticateUser,
                    authorizeRoles('admin'),
                    upload.single('img'),
                    engineerController.addEngineer
                );
router.route('/')
            .get(engineerController.getAllEngineers);

router.route('/:id')
            .get(engineerController.getEngineer);

router.route('/:id')
            .put(
                    authenticateUser,
                    authorizeRoles('admin'),
                    upload.single('img'),
                    engineerController.updateEngineer
                ); 

router.route('/:id')
            .delete(
                authenticateUser,
                authorizeRoles('admin'),
                engineerController.deleteEngineer
            );

router.route('/addfarmer/:id')
            .put(
                authenticateUser,
                authorizeRoles('admin'),
                engineerController.addFarmerToEng
            );
export default router;  