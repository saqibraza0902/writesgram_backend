import express from 'express';
import { Login, SignUp, VerifyOtp } from '../controllers/User.controller';
import { ContactUs } from '../controllers/User.controller';

const router = express.Router();

router.post('/register', SignUp);
router.post('/login', Login);
router.post('/verify', VerifyOtp);
router.post('/contact', ContactUs);

export default router;
