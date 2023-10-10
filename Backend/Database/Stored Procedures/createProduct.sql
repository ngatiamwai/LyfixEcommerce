CREATE OR ALTER PROC createProductProc
    @productId VARCHAR(200),
        @productName VARCHAR(255),
        @productDescription TEXT,
        @productPrice DECIMAL(10, 2),
        @productCategory VARCHAR(100),
        @productImage VARCHAR(255),
        @productNum INT 

AS 
BEGIN
    INSERT INTO productsTable (productId, productName, productDescription, productPrice, productCategory, productImage, productNum, createdAt)
    VALUES (@productId , @productName , @productDescription, @productPrice, @productCategory, @productImage, @productNum, GETDATE())
END

