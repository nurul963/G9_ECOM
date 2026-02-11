import { User } from "../../modals/index.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { SECERATE_KEY } from "../../util/constant.js";
export const addUserService=async(data)=>{
    try {
        const result=await User.create(data);
        return {statusCode:201,result}
    } catch (error) {
        return {statusCode:400,message:error.message}
    }
}
export const getUserService=async()=>{
    try {
        // const result=await User.findByPk(5);
        const result=await User.findAll();
        return {statusCode:201,result}
    } catch (error) {
        return {statusCode:400,message:error.message}
    }
}
export const updateUserService=async(id,data)=>{
    const user=await User.findByPk(id);
    if(!user){
        return {statusCode:400,message:"User not found"}
    }
    try {
        const result=await user.update(data);
        return {statusCode:200,result}
    } catch (error) {
        return {statusCode:400,message:error.message}
    }
}
export const deleteUserService=async(id)=>{
    const user=await User.findByPk(id);
    if(!user){
        return {statusCode:400,message:"User not found"}
    }
    try {
        const result=await user.destroy();
        return {statusCode:200,result}
    } catch (error) {
        return {statusCode:400,message:error.message}
    }
}

export const loginUserService=async(data)=>{
    const {email,password}=data;
    try {
        if(!email || !password){
            return {
                statusCode:400,
                message:"Feild cannot be empty"
            }
        }
        const user=await User.findOne({
            where:{
                email:email
            }
        });
        if(!user){
            return {
                statusCode:400,
                message:"User not registered"
            }
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return {
                statusCode:400,
                message:"Invalid Credential"
            }
        }
        const id=user.id.toString();
        const role=user.role;
        const name=user.name;
        const token=jwt.sign({id,role,email},SECERATE_KEY,{expiresIn:"1hr"})
        return {
            statusCode:200,
            result:{
                token,
                id,
                email,
                role,
                name
            },
            message:"Login Success"
        }
    } catch (error) {
        return {
            statusCode:500,
            message:error.message
        }
    }
}