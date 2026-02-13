import { Category } from "../../modals/index.js";
import { response } from "../../util/response.js"
//add category
const addCategory=async(data)=>{
    let result;
    try {
        if(data.length > 1){
            result=await Category.bulkCreate(data);
        }else{
            result=await Category.create(data);
        }
        return response(201,"Category Added",result);
    } catch (error) {
       return response(500,"INTERNAL_SERVER_ERROR");
    }
}
//get all category
const getCategory=async()=>{
    let result;
    try {
        result=await Category.findAll();
        return response(200,"Category List",result);
    } catch (error) {
       return response(500,"INTERNAL_SERVER_ERROR");
    }
}
const getCategoryById=async(id)=>{
    let result;
    try {
        result=await Category.findByPk(id);
        return response(200,"Category By Id",result);
    } catch (error) {
       return response(500,"INTERNAL_SERVER_ERROR");
    }
}
//update category
const updateCategory=async(id,data)=>{
    let result;
    try {
        const cate=await Category.findByPk(id);
        if(!cate){
            return response(400,"Category not found");
        }
        result=await cate.update(data);
        return response(200,"Category Updated",result);
    } catch (error) {
       return response(500,"INTERNAL_SERVER_ERROR");
    }
}
const deleteCategory=async(id)=>{
    try {
        cate=await Category.findByPk(id);
        if(!cate){
            return response(400,"Category not found");
        }
        await cate.destory();
        return response(200,"Category Deleted");
    } catch (error) {
       return response(500,"INTERNAL_SERVER_ERROR");
    }
}
export const categoryService={
    addCategory,
    getCategory,
    getCategoryById,
    updateCategory,
    deleteCategory
}