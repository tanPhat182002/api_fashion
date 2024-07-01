const {Router} = require('express');
const { getAllUsers,getUserById } = require('../controllers/UserController');
const userRouter = Router()
userRouter.get('/getAll', getAllUsers)
userRouter.get('/getById/:id', getUserById)
module.exports = userRouter
