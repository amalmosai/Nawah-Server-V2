import express from 'express';
import * as prdController from '../controller/productController';
import upload from '../middlewares/uploadImage';
import { authenticateUser,authorizeRoles } from '../middlewares/auth';
const router = express.Router();

router.route('/')
                .post(
                        authenticateUser,
                        authorizeRoles('admin','farmer'),
                        upload.single('imageUrl'), 
                        prdController.addPrd
                );

router.route('/')
                .get( prdController.getAllPrds);

router.route('/:id')
                .get( prdController.getPrd);

router.route('/:id')
                .put(
                        [
                                authenticateUser,
                                authorizeRoles('admin','farmer')
                        ],
                        upload.single('imageUrl'),
                        prdController.editPrd
                );

router.route('/:id')
                .delete(
                        [
                                authenticateUser,
                                authorizeRoles('admin','farmer')
                        ],
                        prdController.deletePrd
                ); 

export default router;