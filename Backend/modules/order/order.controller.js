import { response } from "../../util/response.js";
import { orderService } from "./order.service.js";
const createOrder=async(req,resp)=>{
    const userId=req.user.id || null;
    let result;
    if(!userId){
        result=response(400,"User not found")
    }else{
        result=await orderService.createOrder(parseInt(userId));
    }
    return resp.status(result.statusCode).json(result); 
}
const getAllOrder=async(req,resp)=>{
    result=await orderService.getAllOrder();
    return resp.status(result.statusCode).json(result); 
}
const getOrderByStatus=async(req,resp)=>{
    const status=req.query.status;
    if(!status){
        return response(400,"Status is missing");
    }
    result=await orderService.getOrderByStatus(status);
    return resp.status(result.statusCode).json(result); 
}
const getOrderByUserId=async(req,resp)=>{
    const userId=req.params.id
    if(!userId){
        return response(400,"User Id is missing");
    }
    result=await orderService.getOrderByUserId(userId);
    return resp.status(result.statusCode).json(result); 
}
export const orderController={createOrder,getAllOrder,getOrderByStatus,getOrderByUserId};