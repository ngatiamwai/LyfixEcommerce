const { Router } = require("express");
const { registerUser, loginUser } = require("../Controllers/authControllers");
const { updateUser, getAllUsers } = require("../Controllers/userController");
const { verifyToken } = require("../Middleware/verifyToken");

const userRouter = Router()

userRouter.post('/register', registerUser)
userRouter.get('/login', loginUser)
userRouter.get('/allusers', getAllUsers)
userRouter.post('/update/:userId', verifyToken, updateUser)

module.exports={
    userRouter
}