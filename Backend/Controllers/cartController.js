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

        // Fetch product details based on product_Id
        const productDetails = await fetchProductDetails(product_Id);

        // Check if product details were fetched successfully
        if (!productDetails) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Add the product to the cart using the stored procedure
        const pool = await mssql.connect(sqlConfig);
        const result = await pool.request()
            .input('cartId', cartId)
            .input('user_Id', user_Id)
            .input('product_Id', product_Id)
            .input('productAmount', 1) // Default product amount is 1 when adding to cart
            .execute('addProducToCartProc');
            console.log(cartId, user_Id);

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

// Function to fetch product details based on product_Id (You need to implement this)
async function fetchProductDetails(productId) {
    try {
        const pool = await mssql.connect(sqlConfig);
        const result = await pool.request()
            .input('productId', mssql.VarChar, productId)
            .query('SELECT productName, productPrice FROM productsTable WHERE productId = @productId');

        // Check if the product was found in the database
        if (result.recordset.length > 0) {
            const productDetails = result.recordset[0];
            return {
                productName: productDetails.productName,
                productPrice: productDetails.productPrice
            };
        } else {
            // Product not found, return null
            return null;
        }
    } catch (error) {
        // Handle database error (log it or throw an error)
        console.error(error);
        throw error;
    }
}

module.exports = { 
    addProductToCart
};
