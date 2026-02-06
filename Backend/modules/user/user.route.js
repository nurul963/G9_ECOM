import express from 'express';
import { addUser, deleteUser, getUser, updateUser } from './user.controller.js';
const router=express.Router();
router.post("/add",addUser);
router.get("/",getUser);
router.put("/update/:id",updateUser);
router.delete("/delete/:id",deleteUser);
//http://localhost:8080/api/user/add
export default router;