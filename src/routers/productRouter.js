const {Router} = require('express');
const { getAllProducts, createProduct, uploadImage } = require('../controllers/ProductController');
const uploadMiddleware = require('../middlewares/uploads');

const productRouter = Router()
productRouter.get('/',getAllProducts), 
productRouter.post('/',createProduct)
productRouter.patch('/:id/uploads', uploadMiddleware.array('files'), uploadImage)
module.exports = productRouter