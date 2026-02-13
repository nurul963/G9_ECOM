import { Category, Product, ProductImage } from "../../modals/index.js";
import {response} from '../../util/response.js';
const addProduct=async(data)=>{
    let result;
    try {
        if(data.length > 1){
            result=await Product.bulkCreate(data,{
                include:[Category,ProductImage]
            })
        }else{
            result=await Product.create(data,{
                include:[Category,ProductImage]
            })
        }
        return response(201,"Product Added Successfully")
    } catch (error) {
        return response(500,"INTERNAL_SERVER_ERROR");
    }
}
export const productService={addProduct};