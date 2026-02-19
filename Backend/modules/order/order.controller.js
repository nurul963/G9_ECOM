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
export const orderController={createOrder};