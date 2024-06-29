import express from 'express';
import { authenticateUser } from '../middlewares/auth';
import * as stripeController from '../controller/stripeController';
const router = express.Router();


router.route('/')
            .post(
                    // authenticateUser,
                    stripeController.createPaymentIntent
                );               

export default router; 