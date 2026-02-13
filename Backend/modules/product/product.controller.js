import { response } from "../../util/response.js";
import { productService } from "./product.service.js"
const addProduct=async(req,resp)=>{
    const result=await productService.addProduct(req.body);
    return resp.status(result.statusCode).json(result);
}
export const productController={addProduct};