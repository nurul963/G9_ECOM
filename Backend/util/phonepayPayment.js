import { CreateSdkOrderRequest, MetaInfo } from "pg-sdk-node";
import { response } from "./response.js"
import { API_URL } from "./constant.js";
import { client } from "../config/phonepay.js";
export const paymentInitiate=async(userId,orderId,amount,merchantOrderId)=>{
    try {
        const metaInfo = MetaInfo.builder()
        .udf1(userId)
        .udf2(orderId)
        .build();
        const orderRequest = CreateSdkOrderRequest.StandardCheckoutBuilder()
        .merchantOrderId(merchantOrderId)
        .amount(amount)
        .metaInfo(metaInfo)
        .redirectUrl(`${API_URL}/payment/verify?merchantOrderId=${merchantOrderId}`)
        .expireAfter(3600)
        .message("Payment will expire after 1 miniute")
        .build();
        const pgresponse=await client.pay(orderRequest);
        return await response(200,"Payment Url",pgresponse.redirectUrl);
    } catch (error) {
        return response(400,error.message);
    }
}
export const checkPaymentStatus=async(merchantOrderId)=>{
    try {
        const pgresponse=await client.getOrderStatus(merchantOrderId);
        return await response(200,"Payment Status",pgresponse);
    } catch (error) {
        return response(400,error.message);
    }
}