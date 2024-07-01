const { Router } = require('express')
const {
    createCategory,
    deleteCategory,
    updateCategory,
    getAllCategory,
    getCategoryById
} = require('../controllers/CategoryController')
const authMiddleware = require('../middlewares/authMiddleware')
const authorizedMiddleware = require('../middlewares/authorizedMiddleware')
const validatorMiddleware = require('../middlewares/validatorMiddleware')
const { createCategorySchema, updateCategorySchema } = require('../validations/categorySchema')
const categoryRouter = Router()
{
    categoryRouter.get('/', getAllCategory)
    categoryRouter.get('/:id', getCategoryById)
    categoryRouter.post('/',authMiddleware,authorizedMiddleware('admin'),validatorMiddleware(createCategorySchema), createCategory)
    categoryRouter.delete('/:id',authMiddleware,authorizedMiddleware('admin'), deleteCategory)
    categoryRouter.put('/:id',authMiddleware, authorizedMiddleware('admin'),validatorMiddleware(updateCategorySchema),updateCategory)
}
module.exports = categoryRouter
