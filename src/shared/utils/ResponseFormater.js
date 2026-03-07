class ResponseFormatter {
    static sucess(data = null , message="sucess" , statusCode=200 , ){
        return {
            sucess:true,
            data,
            message,
            statusCode,
            timestamps:new Date().toISOString()
        }

    }

    static error(message="Error",statusCode=500,error=null){
        return {
            sucess:false,
            message,
            statusCode,
            error,
            timestamps:new Date().toISOString()
        }

    }

    static validation(message="Validation error" ,error=null, statusCode=400){
        return {
            message,
            error,
            statusCode,
            timestamps:new Date().toISOString()
        }
    }

    static paginated(data=null , page,limit,total){
        return {
            sucess:true,
            data,
            pagination:{
                page,
                limit,
                total,
                totalPages:Math.ceil(total/limit)
            },
            timestamps:new Date().toISOString()
        }
    }
}


export default ResponseFormatter