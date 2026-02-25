import {Cart, Order, OrderItem, Product} from '../../modals/index.js'
import { response } from '../../util/response.js';
const createOrder=async(userId)=>{
    try {
        const cartItems=await Cart.findAll({
            where:{userId},
            include:Product
        });
        if(cartItems.length===0){
            return response(400,"Cart is empty");
        }
        let totalAmount=0;
        const order=await Order.create({
            totalAmount,
            userId
        });
        for(let cart of cartItems){
            if(!cart.product){
                throw new Error("Product not found")
            }
            const product=cart.product;
            if(product.stock < cart.quantity){
                throw new Error("Out of stock product");
            }
            product.stock-=cart.quantity;
            const orderItem=await OrderItem.create({
                quantity:cart.quantity,
                priceAtPurchase:product.price,
                orderId:order.id,
                productId:product.id
            });
            totalAmount+=parseInt(product.price)*parseInt(cart.quantity);
            await product.save();
        }
        order.totalAmount=totalAmount;
        await order.save();
        await Cart.destroy({where:{userId}});
        return {
            statusCode:200,
            message:"Order Placed",
            order
        }
    } catch (error) {
       return response(400,error.message);
    }
}
const getAllOrder=async()=>{
    try {
        const orders=await Order.findAll();
        return response(200,"OrderList",orders);
    } catch (error) {
        return response(400,error.message);
    }
}
const getOrderByStatus=async(status)=>{
    try {
        const orders=await Order.findAll({where:{status}});
        return response(200,"OrderList",orders);
    } catch (error) {
        return response(400,error.message);
    }
}
const getOrderByUserId=async(userId)=>{
    try {
        const orders=await Order.findAll({where:{userId}});
        return response(200,"OrderList",orders);
    } catch (error) {
        return response(400,error.message);
    }
}
export const orderService={createOrder,getAllOrder,getOrderByStatus,getOrderByUserId};