import { Product ,Cart} from "../../modals/index.js";
import { response } from "../../util/response.js"

const addToCart=async(data)=>{
    try {
        const {userId,quantity,productId}=data;
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
        product.stock-=quantity;
        await product.save();
        return response(201,"Product Added to cart",result);

    } catch (error) {
        return response(500,error.message);
    }
    
}
export const cartService={addToCart}