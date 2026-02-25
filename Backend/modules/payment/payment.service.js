import { Order,Payment } from "../../modals/index.js";
import { checkPaymentStatus, paymentInitiate } from "../../util/phonepayPayment.js";
import { response } from "../../util/response.js"
import {randomUUID} from 'crypto';
const checkOutPayment=async(orderId,userId)=>{
    try {
        const order=await Order.findOne({where:{id:orderId}});
        const amount=parseInt(order.totalAmount)*100;
        const randomValue=randomUUID();
        const merchantOrderId=`TXN_${orderId}_${randomValue}_${Date.now()}`;
        await Payment.create({
            method:"UPI",
            transactionId:merchantOrderId,
            orderId
        })
        const result=await paymentInitiate(userId,orderId,amount,merchantOrderId);
        return result;
    } catch (error) {
        return response(400,error.message);
    }
}
const paymentStaus=async(merchantOrderId)=>{
    const result=await checkPaymentStatus(merchantOrderId);
    // console.log(result);
    const id=result.result.metaInfo.udf2;
    if(result.result.state==="COMPLETED"){
        const payment=await Payment.findOne({where:{transactionId:merchantOrderId}});
        payment.status="SUCCESS";
        await payment.save();
        const order=await Order.findByPk(id);
        order.status="PAID";
        order.save();
    }else{
        const payment=await Payment.findOne({where:{transactionId:merchantOrderId}});
        payment.status="FAILED";
    }
    return result;
}
export const paymentService={
    checkOutPayment,
    paymentStaus
}