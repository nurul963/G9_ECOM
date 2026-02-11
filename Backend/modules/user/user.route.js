import express from 'express';
import { addUser, deleteUser, getUser, loginUser, updateUser } from './user.controller.js';
import { isAuthenticate } from '../auth/isAuthenticate.js';
import { roleMiddleware } from '../../middleware/roleMiddleware.js';
const router=express.Router();
router.post("/add",isAuthenticate,addUser);
router.get("/",isAuthenticate, getUser);
router.put("/update/:id",isAuthenticate,updateUser);
router.delete("/delete/:id",isAuthenticate,roleMiddleware('ADMIN'),deleteUser);
router.post("/login",loginUser);
//http://localhost:8080/api/user/add
export default router;