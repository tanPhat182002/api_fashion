const errorMiddleware = (error, req, res, next) => {
   const {code, message} = error
   return res.status(typeof code === 'number' ? code : 500).json({
         status: 'false',
         message: message || 'Lỗi không xác định từ server'
        })
    }
module.exports = errorMiddleware