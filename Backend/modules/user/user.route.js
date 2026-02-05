import express from 'express';
import { addUser, getUser } from './user.controller.js';
const router=express.Router();
router.post("/add",addUser);
router.get("/",getUser);
//http://localhost:8080/api/user/add
export default router;