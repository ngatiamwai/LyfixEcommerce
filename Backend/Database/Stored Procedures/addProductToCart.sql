CREATE OR ALTER PROCEDURE addProducToCartProc
    @cartId VARCHAR(250),
    @user_Id VARCHAR(250),
    @product_Id VARCHAR(200),
    @productAmount INT
AS
BEGIN
    SET NOCOUNT ON;

    -- Check if the cartId and product_Id are valid
    IF EXISTS (SELECT 1 FROM cartsTable WHERE cartId = @cartId AND user_Id = @user_Id)
    BEGIN
        -- Fetch product details from productsTable
        DECLARE @productName VARCHAR(255);
        DECLARE @productPrice DECIMAL(10, 2);

        SELECT @productName = productName, @productPrice = productPrice
        FROM productsTable
        WHERE productId = @product_Id;

        -- Check if the product already exists in the cart, if so, update the quantity
        IF EXISTS (SELECT 1 FROM cartsTable WHERE cartId = @cartId AND product_Id = @product_Id)
        BEGIN
            UPDATE cartsTable
            SET productAmount = productAmount + @productAmount
            WHERE cartId = @cartId AND product_Id = @product_Id;
        END
        ELSE
        BEGIN
            -- Insert the new product into the cart
            INSERT INTO cartsTable (cartId, user_Id, product_Id, productName, productPrice, productAmount)
            VALUES (@cartId, @user_Id, @product_Id, @productName, @productPrice, @productAmount);
        END
    END
    -- ELSE
    -- BEGIN
    --     THROW 50002, 'Invalid cartId or user_Id', 1;
    -- END
END;
