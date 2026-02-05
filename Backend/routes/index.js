import express from 'express';
import userRoute from '../modules/user/user.route.js';
const router=express.Router();
router.use("/user",userRoute);
//http://localhost:8080/api/user/add
export default router;