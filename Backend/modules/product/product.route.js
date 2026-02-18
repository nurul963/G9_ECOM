import express from 'express';
import { isAuthenticate } from '../auth/isAuthenticate.js';
import { roleMiddleware } from '../../middleware/roleMiddleware.js';
import { productController } from './product.controller.js';
import { upload } from '../../middleware/upload.js';
const router=express.Router();
router.post("/",upload.array("images",5), isAuthenticate,roleMiddleware('ADMIN','SELLER'),productController.addProduct);
router.get("/",productController.getAllProduct);
export default router;