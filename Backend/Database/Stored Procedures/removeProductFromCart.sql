CREATE OR ALTER PROCEDURE removeProductFromCartProc
    @cartId VARCHAR(250)
AS
BEGIN
    DELETE FROM cartsTable
    WHERE cartId = @cartId;
END;
