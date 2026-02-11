import jwt from 'jsonwebtoken';
import {SECERATE_KEY} from '../../util/constant.js';
export const isAuthenticate=async(req,resp,next)=>{
    const token=req.cookies.token;
    if(!token){
        return resp.status(400).json({
            statusCode:400,
            message:"Token does not exsist"
        })
    }
    try {
        //coding for parse token
        const decode=jwt.verify(token,SECERATE_KEY);
        const id=decode.id;
        const role=decode.role;
        const email=decode.email;
        req.user={id,email,role}
        next();
    } catch (error) {
        return resp.status(500).json({
            statusCode:500,
            message:"INTERNAL_SERVER_ERROR"
        })
    }
}