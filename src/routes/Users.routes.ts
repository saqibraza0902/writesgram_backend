import express from 'express'
import { Login, SignUp, VerifyOtp } from '../controllers/User.controller'
import { ContactUs, UpdateProfile } from '../controllers/User.controller'
import { ResetPassword, AdminLogin } from '../controllers/User.controller'
const router = express.Router()

router.post('/register', SignUp)
router.post('/login', Login)
router.post('/verify', VerifyOtp)
router.post('/contact', ContactUs)
router.patch('/update', UpdateProfile)
router.patch('/reset-password', ResetPassword)
// Admin Routes
router.post('/admin/login', AdminLogin)
export default router
