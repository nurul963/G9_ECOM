import express from 'express';
import userRoute from '../modules/user/user.route.js';
import categoryRoute from '../modules/category/category.route.js';
import productRoute from '../modules/product/product.route.js';
const router=express.Router();
router.use("/user",userRoute);
router.use("/category",categoryRoute);
router.use("/product",productRoute);
//http://localhost:8080/api/user/add
export default router;