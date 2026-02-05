import { addUserService, getUserService } from "./user.service.js"

export const addUser=async(req,resp)=>{
    const result=await addUserService(req.body);
    return resp.status(result.statusCode).json({result})
}
export const getUser=async(req,resp)=>{
    const result=await getUserService();
    return resp.status(result.statusCode).json({result})
}