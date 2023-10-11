CREATE OR ALTER PROCEDURE addProductToCartProc
    @cartId VARCHAR(250),
    @user_Id VARCHAR(250),
    @product_Id VARCHAR(200)
AS
BEGIN
    DECLARE @productName VARCHAR(250);
    DECLARE @productPrice DECIMAL(10, 2);
    
    -- Retrieve product name and price from productsTable
    SELECT @productName = productName, @productPrice = productPrice
    FROM productsTable
    WHERE productId = @product_Id;

    -- Insert into cartsTable with retrieved product name and price
    INSERT INTO cartsTable (cartId, user_Id, product_Id, productName, productPrice, productAmount)
    VALUES (@cartId, @user_Id, @product_Id, @productName, @productPrice, 1);
END;
