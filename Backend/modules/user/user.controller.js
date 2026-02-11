import { addUserService, deleteUserService, getUserService, loginUserService, updateUserService } from "./user.service.js"

export const addUser=async(req,resp)=>{
    const result=await addUserService(req.body);
    return resp.status(result.statusCode).json({result})
}
export const getUser=async(req,resp)=>{
    const result=await getUserService();
    return resp.status(result.statusCode).json({result})
}
export const updateUser=async(req,resp)=>{
    const id=req.params.id;
    // console.log(req);
    const result=await updateUserService(id,req.body);
    return resp.status(result.statusCode).json({
        result
    })
}
export const deleteUser=async(req,resp)=>{
   const id=req.params.id;
    // console.log(req);
    const result=await deleteUserService(id);
    return resp.status(result.statusCode).json({
        result
    }) 
}
export const loginUser=async(req,resp)=>{
    const result=await loginUserService(req.body);
    if(result.result && result.result.token){
        resp.cookie('token',result.result.token,{
            httpOnly:true,
            secure:false,
            samesite:'strict'
        })
    }
    return resp.status(result.statusCode).json({
        result
    }) 
}