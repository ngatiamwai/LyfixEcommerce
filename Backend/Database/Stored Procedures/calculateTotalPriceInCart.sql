CREATE OR ALTER PROCEDURE calculateTotalPriceProc
    @user_Id VARCHAR(250),
    @totalPrice DECIMAL(10, 2) OUTPUT
AS
BEGIN
    SET @totalPrice = 0;

    -- Calculate total price based on products in the user's cart
    SELECT @totalPrice = SUM(productPrice)
    FROM cartsTable
    WHERE user_Id = @user_Id;
END;
