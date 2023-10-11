const { v4 } = require('uuid');
const mssql = require('mssql');
const { sqlConfig } = require('../Config/config');

const addProductToCart = async (req, res) => {
    try {
        const { user_Id, product_Id } = req.params;

        // Validate parameters
        if (!user_Id || !product_Id) {
            return res.status(400).json({ message: 'Invalid request parameters' });
        }

        // Generate a new cartId
        const cartId = v4();

        // Add the product to the cart using the stored procedure
        const pool = await mssql.connect(sqlConfig);
        const request = pool.request();
        
        // Define the input parameters for the stored procedure
        request.input('cartId', cartId);
        request.input('user_Id', user_Id);
        request.input('product_Id', product_Id);

        // Execute the stored procedure
        const result = await request.execute('addProductToCartProc');

        // Check the result and send appropriate response
        if (result.rowsAffected[0] === 1) {
            return res.status(201).json({ message: 'Product added to cart' });
        } else {
            return res.status(500).json({ message: 'Failed to add product to cart' });
        }
    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getProductsByUserId = async (req, res)=>{
    try {
        const { user_Id } = req.params
        
        const pool = await mssql.connect(sqlConfig)
        const yourCart = await pool.request()
        .input('user_Id', user_Id)
        .execute('getProductsInCartByUserIdProc')

        if (yourCart.rowsAffected[0]>0 ){
            return res.status(200).json({Your_Cart: yourCart.recordset})

        }else{
            return res.status(404).send("No products in this cart")
        }

    } catch (error) {
        return res.status(500).json({Error : error})
    }
}


const removeProductFromCart = async (req, res)=>{
    try {
        const { cartId } = req.params
        const pool  = await mssql.connect(sqlConfig)

        const removeProduct = await pool.request()
        .input('cartId', cartId)
        .execute('removeProductFromCartProc')

        if(removeProduct.rowsAffected[0] = 1){
            return res.status(200).json({message: "Product removed successfully"})
        }else{
            return res.status(404).json({message : "Product not removed from cart"})
        }
    } catch (error) {
        return res.status(500).json({Error : error})
    }
}


module.exports = { 
    addProductToCart,
    getProductsByUserId,
    removeProductFromCart
};

