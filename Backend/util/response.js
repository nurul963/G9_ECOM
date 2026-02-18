export const response=async(statusCode,msg,data=null)=>{
    return {
        statusCode,
        message:msg,
        result:data
    }
}