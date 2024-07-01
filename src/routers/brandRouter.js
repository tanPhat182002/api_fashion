const {Router} = require('express');

const { getAllBrands, getBrandById, createBrand, updateBrand, deleteBrand } = require('../controllers/BrandController');
const authMiddleware = require('../middlewares/authMiddleware');
const authorizedMiddleware = require('../middlewares/authorizedMiddleware');
const validatorMiddleware = require('../middlewares/validatorMiddleware');
const { createBrandSchema, updateBrandSchema } = require('../validations/brandSchema');

const brandRouter = Router()
brandRouter.get('/', getAllBrands)
brandRouter.get('/:id', getBrandById)
brandRouter.post('/',authMiddleware,authorizedMiddleware('admin'),validatorMiddleware(createBrandSchema), createBrand)
brandRouter.put('/:id',authMiddleware,authorizedMiddleware('admin'),validatorMiddleware(updateBrandSchema), updateBrand)
brandRouter.delete('/:id',authMiddleware, authorizedMiddleware('admin'),deleteBrand)
module.exports = brandRouter