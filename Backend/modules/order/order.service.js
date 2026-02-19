import {Cart, Product} from '../../modals/index.js'
import { response } from '../../util/response.js';
const createOrder=async(userId)=>{
    try {
        const cartItems=await Cart.findAll({
            where:{userId},
            include:Product
        });

        return {
            statusCode:200,
            message:"Order Placed",
            cartItems
        }
    } catch (error) {
       return response(400,error.message);
    }
}
export const orderService={createOrder};