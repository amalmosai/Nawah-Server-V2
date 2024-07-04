import express from 'express';
const router = express.Router();
import * as orderController from '../controller/orderController';
import { authenticateUser, authorizeRoles } from '../middlewares/auth';

router.route('/')
            .post(
                    authenticateUser,
                    authorizeRoles('user','farmer'),
                    orderController.createOrder
                );

router.route('/')
                .get(orderController.getAllOrders);

router.route('/:id')
                .put(
                        authenticateUser,
                        orderController.updateOrder
                    );

router.route('/:id')
            .get(orderController.getOrder);

router.route('/:id')
            .delete(orderController.deleteOrder); 

router.route('/orderOfUser/:id')
            .get(orderController.getOrdersForUser);


export default router; 