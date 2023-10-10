CREATE OR ALTER PROC updateProductProc
        @productId VARCHAR(200),
        @productName VARCHAR(255),
        @productDescription TEXT,
        @productPrice DECIMAL(10, 2),
        @productCategory VARCHAR(100),
        @productImage VARCHAR(255)


AS
BEGIN
    SET NOCOUNT ON;
    IF EXISTS (SELECT 1 FROM productsTable WHERE productId = @productId)
    BEGIN
    UPDATE productsTable
    SET
        productName = @productName,
        productDescription = @productDescription,
        productPrice = @productPrice,
        productCategory = @productCategory,
        productImage = @productImage,
        updatedAt = GETDATE()
        WHERE productId= @productId

            SELECT 'Product updated successfully' AS Status;
        END
        ELSE
        BEGIN
        -- Product with the given ProductId does not exist
        SELECT 'Product not found' AS Status;
    END
END
