import { response } from "../../util/response.js";
import { paymentService } from "./payment.service.js";

const checkOutPayment=async(req,resp)=>{
    const userId=req.user.id || null;
    const {orderId}=req.body || null;
    if(!userId || !orderId)
        return response(400,"Order id missing");
    const result=await paymentService.checkOutPayment(orderId,userId);
    return resp.status(result.statusCode).json(result);
}
const checkPaymentStatus=async(req,resp)=>{
    const merchantOrderId=req.query.merchantOrderId || null;
    if(!merchantOrderId){
        return response(400,"TXN not found");
    }
    const result=await paymentService.paymentStaus(merchantOrderId);
    return resp.status(result.statusCode).json(result);
}
export const paymentController={checkOutPayment,checkPaymentStatus};