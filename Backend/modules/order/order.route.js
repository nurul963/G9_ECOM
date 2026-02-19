import express from 'express';
import { isAuthenticate } from '../auth/isAuthenticate.js';
import { orderController } from './order.controller.js';
const router=express.Router();
router.post("/",isAuthenticate,orderController.createOrder);
export default router;