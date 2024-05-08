import express from 'express';
import { adminController } from '../controllers/admin.controller';

const adminc = new adminController();
const router = express.Router();

router.post('/signup',adminc.signUp);
router.post('/login',adminc.login);

export default router;