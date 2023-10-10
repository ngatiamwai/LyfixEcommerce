BEGIN TRY
CREATE TABLE cartsTable(
    cartId VARCHAR(250) PRIMARY KEY,
    user_Id VARCHAR(250) ,
    product_Id VARCHAR(200) NOT NULL,
    productName VARCHAR(250) NOT NULL,
    productPrice DECIMAL(10, 2) NOT NULL,
    productAmount INT NOT NULL DEFAULT 1,
    FOREIGN KEY (user_Id) REFERENCES usersTable(userId),
    FOREIGN KEY (product_Id) REFERENCES productsTable(productId)
)
END TRY
BEGIN CATCH
    THROW 50001, 'Table already exists!', 1;
END CATCH;

SELECT * FROM cartsTable