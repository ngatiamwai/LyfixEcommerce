const { Router } = require("express");
const { addProductToCart } = require("../Controllers/cartController");

const cartRouter = Router()

cartRouter.post('/addtocart/:user_Id/:product_Id', addProductToCart)

module.exports={
    cartRouter
}