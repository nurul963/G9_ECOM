export const response=async(statusCode,msg,data)=>{
    return {
        statusCode,
        message:msg,
        result:data || null
    }
}