import { cartService } from "./cart.service.js";
const addToCart=async(req,resp)=>{
    const result=await cartService.addToCart(req.body);
    return resp.status(result.statusCode).json(result);
}
export const cartController={addToCart}