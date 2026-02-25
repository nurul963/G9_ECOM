import express from 'express';
import { isAuthenticate } from '../auth/isAuthenticate.js';
import { paymentController } from './payment.controller.js';
const router=express();
router.post("/",isAuthenticate,paymentController.checkOutPayment);
router.get("/verify",paymentController.checkPaymentStatus);
export default router;