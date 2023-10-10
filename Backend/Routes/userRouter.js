const { Router } = require("express");
const { registerUser, loginUser } = require("../Controllers/authControllers");
const { updateUser, getAllUsers, getOneUser, deleteUser } = require("../Controllers/userController");
const { verifyToken } = require("../Middleware/verifyToken");
// const { createProduct } = require("../Controllers/productsController");

const userRouter = Router()
// const productsRouter = Router()

userRouter.post('/register', registerUser)
userRouter.get('/login', loginUser)
userRouter.get('/allusers', getAllUsers)
userRouter.post('/update/:userId', verifyToken, updateUser)
userRouter.get('/oneuser/:userId', getOneUser)
userRouter.delete('/deleteuser/:userId', deleteUser)

// productsRouter.post('/newproduct', createProduct)

module.exports={
    userRouter,
    // productsRouter
}