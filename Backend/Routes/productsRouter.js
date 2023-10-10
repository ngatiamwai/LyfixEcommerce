const { Router } = require("express");
const { createProduct, getAllProducts, getOneProduct, updateProduct, deleteProduct } = require("../Controllers/productsController");

const productsRouter = Router()

productsRouter.post('/newproduct', createProduct)
productsRouter.get('/allproducts', getAllProducts)
productsRouter.get('/oneproduct/:productId', getOneProduct)
productsRouter.post('/updateproduct/:productId', updateProduct)
productsRouter.delete('/deleteproduct/:productId', deleteProduct)

module.exports= {
    productsRouter
}