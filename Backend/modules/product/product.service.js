import { Category, Product, ProductImage } from "../../modals/index.js";
import {response} from '../../util/response.js';
import { uploadImages } from "../../config/cloudinary.js";
const addProduct=async(files,data)=>{
    try {
        const product=await Product.create(data);
        const uploadImage=[];
        for(let file of files){
            const result=await uploadImages(file);
            // console.log(result);
            uploadImage.push({
                imageUrl:result.secure_url,
                publicId:result.public_id,
                productId:product.id
            })
            if(uploadImage.length === files.length)
                await ProductImage.bulkCreate(uploadImage);
        }
        return response(201,"Product Added Successfully")
    } catch (error) {
        return response(500,error.message);
    }
}
const getAllProduct=async()=>{
    try {
        const result=await Product.findAll({
            include:{model:Category,model:ProductImage}
        });
        return response(201,"Product Fetched Successfully",result)
    } catch (error) {
        return response(500,error.message);
    }
}
export const productService={
    addProduct,
    getAllProduct
};