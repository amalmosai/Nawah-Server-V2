import express from 'express';
import * as contactController from '../controller/contactController';
import { authenticateUser} from '../middlewares/auth';
const router = express.Router();


router.route('/')
            .post(
                    authenticateUser,
                    contactController.addMessage
                );
router.route('/')
            .get(contactController.getAllMessages);

export default router;  