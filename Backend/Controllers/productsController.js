const mssql = require('mssql')
const { v4 } = require('uuid')
const { sqlConfig } = require('../Config/config')
// const uuid = require('uuid')

const createProduct = async (req, res)=>{
    try {
        const productId = v4()
        const {productName, productDescription, productPrice, productCategory, productImage, productNum} = req.body

        const pool = await mssql.connect(sqlConfig)

        const product = await pool.request()
        .input('productId', mssql.VarChar, productId)
        .input('productName', productName)
        .input('productDescription', productDescription)
        .input('productPrice', productPrice)
        .input('productCategory', productCategory)
        .input('productImage', productImage)
        .input('productNum', productNum)
        .execute('createProductProc')

        if(product.rowsAffected[0] == 1){
            return res.status(200).json({message: "Product created successfully"})
        }else{
            return res.status(400).json({message: "Product was not created"})
        }

    } catch (error) {
        return res.status(500).json({Error: error})
    }
}

const getAllProducts = async (req, res)=>{
    try {
        const pool = await mssql.connect(sqlConfig)
        const  allProducts = await pool.request()
        .execute('getAllProductsProc')

        return res.status(200).json({allProducts: allProducts.recordset})
    } catch (error) {
        return res.status(500).json({Error: error})
    }
}

const getOneProduct = async (req, res)=>{
    try {
        const { productId } = req.params

        const pool = await mssql.connect(sqlConfig)

        const oneProduct = await pool.request()
        .input('productId', productId)
        .execute('getOneProductProc')

        return res.status(200).json({Product : oneProduct.recordset})
    } catch (error) {
        return res.status(500).json({Error: error})
    }
}

const updateProduct = async (req,res)=>{
    try {
        const { productId: productId } = req.params
        const { productName, productDescription, productPrice, productCategory, productImage } = req.body

        const pool = await mssql.connect(sqlConfig)
        const updateProduct = await pool.request()

        .input('productId', productId)
        .input('productName', productName)
        .input('productDescription', productDescription)
        .input('productPrice', productPrice)
        .input('productCategory', productCategory)
        .input('productImage', productImage)
        .execute('updateProductProc')

        console.log(updateProduct);

        if(updateProduct.rowsAffected[0] > 1){
            return res.status(200).json({message: "Product updated successfully"})
        }else{
            return res.status(400).json({message: "Product not updated"})
        }
    } catch (error) {
        return res.status(500).json({Error: error})
    }
}

const deleteProduct = async (req, res)=>{
    try {
        const {productId} = req.params
        const pool = await mssql.connect(sqlConfig)
        const deleteaProduct = await pool.request()
        .input('productId', productId)
        .execute('deleteProductProc')

        if(deleteaProduct.rowsAffected[0] == 1){
            return res.status(200).json({messsage: "Product deleted successfully"})
        }else{
            return res.status(400).json({message: "Product not deleted"})
        }
    } catch (error) {
        return res.status(500).json({Error: error})
    }
}

module.exports = {
    createProduct,
    getAllProducts,
    getOneProduct,
    updateProduct,
    deleteProduct
}

