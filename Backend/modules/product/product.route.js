import express from 'express';
import { isAuthenticate } from '../auth/isAuthenticate.js';
import { roleMiddleware } from '../../middleware/roleMiddleware.js';
import { productController } from './product.controller.js';
const router=express.Router();
router.post("/",isAuthenticate,roleMiddleware('ADMIN','SELLER'),productController.addProduct);
export default router;