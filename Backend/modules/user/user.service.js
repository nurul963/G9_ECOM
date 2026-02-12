import { User } from "../../modals/index.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { GMAIL_ID, SECERATE_KEY } from "../../util/constant.js";
import { sendMail } from "../../util/common.js";
export const addUserService=async(data)=>{
    let result;
    try {
        const {role,email}=data;
        if(role==="ADMIN"){
            data.isActive=1;
            result=await User.create(data);
        }else if(role==="SELLER"){
            //send mail to admin
            result=await User.create(data);
            const sellerText=`
            Your account is created but it is pending for verification, Please contact to admin 
            username:${email}
            `;
            const sellerSubject='Account Created'
            const info=await sendMail(sellerText,email,sellerSubject);
            if(info.messageId){
                const adminText=`
                One new Account is created please Activate
                userName:${email},
                Name:${data.name},
                Role:${role}
                `;
                const adminSubject='ACTIVATE ACCOUT'
                const infoAdmin=await sendMail(adminText,GMAIL_ID,adminSubject);
                if(infoAdmin.messageId){
                    return {
                        statusCode:200,
                        message:"Account is Pending for Verification from Admin side"
                    }
                }
                
            }
        }else{
            //email verification for user using OTP
            result=await User.create(data);
        }
        
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
        if(!user.isActive){
            return {
                statusCode:400,
                message:`${user.name} has been blocked please contact to Admin`
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