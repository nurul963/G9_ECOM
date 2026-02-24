import { Product ,Cart} from "../../modals/index.js";
import { response } from "../../util/response.js"

const addToCart=async(userId,data)=>{
    try {
        const {quantity,productId}=data;
        const product=await Product.findOne({where:{id:productId}});
        if(!product){
            return response(400,"Product Not Found");
        }
        if(product.stock < quantity){
            return response(400,"Out of Stock");
        }
        const exsisting=await Cart.findOne({
            where:{userId,productId}
        });
        let result;
        if(!exsisting){
            result=await Cart.create({
                userId,
                productId,
                quantity
            });
            
        }else{
            exsisting.quantity+=quantity;
            await exsisting.save();
        }
        return response(201,"Product Added to cart",result);

    } catch (error) {
        return response(500,error.message);
    }
    
}
const getAllCart=async()=>{
    try {
        const carts=await Cart.findAll();
        return response(200,"Cart List",carts);
    } catch (error) {
        return response(400,error.message);
    }
}
const getCartByUserId=async(userId)=>{
    try {
        const carts=await Cart.findAll({where:{userId}});
        return response(200,"Cart List",carts);
    } catch (error) {
        return response(400,error.message);
    }
}
const getCartByProductId=async(productId)=>{
    try {
        const carts=await Cart.findAll({where:{productId}});
        return response(200,"Cart List",carts);
    } catch (error) {
        return response(400,error.message);
    }
}
export const cartService=
{
    addToCart,
    getAllCart,
    getCartByUserId,
    getCartByProductId
}