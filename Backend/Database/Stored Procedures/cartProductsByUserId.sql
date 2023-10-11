CREATE OR ALTER PROCEDURE getProductsInCartByUserIdProc
    @user_Id VARCHAR(250)
AS
BEGIN
    -- Calculate total price of all products in the cart
    DECLARE @totalAllProducts DECIMAL(10, 2);
    SELECT @totalAllProducts = SUM(productPrice * productAmount)
    FROM cartsTable
    WHERE user_Id = @user_Id;

    -- Calculate total price of products with multiple quantities
    DECLARE @totalMultiQuantityProducts DECIMAL(10, 2);
    SELECT @totalMultiQuantityProducts = SUM(productPrice * (productAmount - 1))
    FROM cartsTable
    WHERE user_Id = @user_Id
    GROUP BY productName
    HAVING COUNT(productName) > 1;

    -- Select individual product details and calculated total prices
    SELECT productName, SUM(productPrice) AS productPrice, SUM(productAmount) AS productAmount
    FROM cartsTable
    WHERE user_Id = @user_Id
    GROUP BY productName
    ORDER BY productName;

    -- Return total prices
    SELECT @totalAllProducts AS totalAllProducts, @totalMultiQuantityProducts AS totalMultiQuantityProducts;
END;
