import { response } from "../../util/response.js";
import { productService } from "./product.service.js"
const addProduct=async(req,resp)=>{
    const result=await productService.addProduct(req.files,req.body);
    return resp.status(result.statusCode).json(result);
}
const getAllProduct=async(req,resp)=>{
    const result=await productService.getAllProduct();
    return resp.status(result.statusCode).json(result);
}
export const productController={addProduct,getAllProduct};