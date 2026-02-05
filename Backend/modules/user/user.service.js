import { where } from "sequelize";
import { User } from "../../modals/index.js"
import {Op} from 'sequelize';
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