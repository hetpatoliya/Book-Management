import express from 'express';
import { AdminController } from '../controllers/admin.controller';

const adminController = new AdminController();
const router = express.Router();

router.post('/admin/signup',adminController.signUp);
router.post('/admin/login',adminController.login);

export default router;