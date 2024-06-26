import express from 'express';
import * as authController from '../controller/authController';
const router = express.Router();

router.route('/register')
            .post(authController.register);

router.route('/login')
            .post(authController.login);

            
router.route('/logout')
            .get(authController.logout); 

export default router;            