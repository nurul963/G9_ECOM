import { response } from "../../util/response.js";
import { categoryService } from "./category.service.js";
const addCategory=async(req,resp)=>{
    const result=await categoryService.addCategory(req.body);
    return resp.status(result.statusCode).json(result);
}
const getCategory=async(req,resp)=>{
    const result=await categoryService.getCategory();
    return resp.status(result.statusCode).json(result);
}
const getCategoryById=async(req,resp)=>{
    const id=req.params.id;
    if(!id){
        return response(400,"Id must be in params");
    }
    const result=await categoryService.getCategoryById(id);
    return resp.status(result.statusCode).json(result);
}
const updateCategory=async(req,resp)=>{
    const id=req.params.id;
    if(!id){
        return response(400,"Id must be in params");
    }
    const result=await categoryService.updateCategory(id,req.body);
    return resp.status(result.statusCode).json(result);
}
const deleteCategory=async(req,resp)=>{
    const id=req.params.id;
    if(!id){
        return response(400,"Id must be in params");
    }
    const result=await categoryService.deleteCategory(id);
    return resp.status(result.statusCode).json(result);
}
export const categoryController={
    addCategory,
    getCategory,
    getCategoryById,
    updateCategory,
    deleteCategory
}