import { cartService } from "./cart.service.js";
const addToCart=async(req,resp)=>{
    // console.log(req.user);
    const userId=req.user.id;
    const result=await cartService.addToCart(userId,req.body);
    return resp.status(result.statusCode).json(result);
}
const getAllCart=async(req,resp)=>{
    const result=await cartService.getAllCart();
    return resp.status(result.statusCode).json(result);
}
const getCartByUserId=async(req,resp)=>{
    const userId=req.params.id;
    const result=await cartService.getCartByUserId(userId);
    return resp.status(result.statusCode).json(result);
}
const getCartByProductId=async(req,resp)=>{
    const productId=req.params.id;
    const result=await cartService.getCartByProductId(productId);
    return resp.status(result.statusCode).json(result);
}
export const cartController={addToCart,getAllCart,getCartByUserId,getCartByProductId}