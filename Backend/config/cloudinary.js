import {v2 as cloudinary} from 'cloudinary';
import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECERATE, CLOUDINARY_NAME } from '../util/constant.js';
cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECERATE,
});
export const uploadImages=async(file)=>{
    try {
       const result=await cloudinary.uploader.upload(
        `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
        {
            folder:"G9-Images"
        }
       )
       return result;
    } catch (error) {
       console.error(error); 
    }
}