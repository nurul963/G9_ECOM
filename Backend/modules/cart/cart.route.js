import express from 'express';
import { isAuthenticate } from '../auth/isAuthenticate.js';
import { roleMiddleware } from '../../middleware/roleMiddleware.js';
import { cartController } from './cart.controller.js';
const router=express.Router();
router.post("/",cartController.addToCart);
export default router;