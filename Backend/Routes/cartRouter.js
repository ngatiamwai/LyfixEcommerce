const { Router } = require("express");
const { addProductToCart, getProductsByUserId, removeProductFromCart } = require("../Controllers/cartController");

const cartRouter = Router()

cartRouter.post('/addtocart/:user_Id/:product_Id', addProductToCart)
cartRouter.get('/yourcart/:user_Id', getProductsByUserId)
cartRouter.delete('/removefromcart/:cartId', removeProductFromCart)

module.exports={
    cartRouter
}