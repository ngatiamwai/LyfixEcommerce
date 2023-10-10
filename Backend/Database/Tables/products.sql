BEGIN TRY
CREATE TABLE productsTable(
        productId VARCHAR(200) PRIMARY KEY,
        productName VARCHAR(255) NOT NULL,
        productDescription TEXT,
        productPrice DECIMAL(10, 2) NOT NULL,
        productCategory VARCHAR(100),
        productImage VARCHAR(255),
        productNum INT NOT NULL DEFAULT 0, 
        createdAt DATETIME DEFAULT GETDATE(),
        updatedAt DATETIME
    );
END TRY
BEGIN CATCH
    THROW 50001, 'Table already exists!', 1;
END CATCH;


SELECT * FROM productsTable