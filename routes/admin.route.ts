import express from 'express';
import { adminController } from '../controllers/admin.controller';

const adminc = new adminController();
const router = express.Router();

router.post('/admin/signup',adminc.signUp);
router.post('/admin/login',adminc.login);

export default router;