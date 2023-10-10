CREATE OR ALTER PROC deleteProductProc(@productId VARCHAR (200))
AS
BEGIN
DELETE FROM productsTable WHERE productId = @productId
END