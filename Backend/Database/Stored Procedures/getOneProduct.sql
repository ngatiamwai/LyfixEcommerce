CREATE OR ALTER PROC getOneProductProc(
    @productId VARCHAR(200)
    )
AS
BEGIN
SELECT * FROM productsTable WHERE productId = @productId
END