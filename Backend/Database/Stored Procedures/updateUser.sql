CREATE OR ALTER PROCEDURE updateUserProc
    @userId VARCHAR(250),
    @firstName VARCHAR(250),
    @lastName VARCHAR(250),
    @email VARCHAR(200),
    @phoneNumber VARCHAR(20)
AS
BEGIN
    SET NOCOUNT ON;
    
    -- Check if the user with the given userId exists
    IF EXISTS (SELECT 1 FROM usersTable WHERE userId = @userId)
    BEGIN
        -- Update the user's information
        UPDATE usersTable
        SET 
            firstName = @firstName,
            lastName = @lastName,
            email = @email,
            phoneNumber = @phoneNumber
        WHERE userId = @userId;

        SELECT 'User updated successfully' AS Status;
    END
    ELSE
    BEGIN
        -- User with the given userId does not exist
        SELECT 'User not found' AS Status;
    END
END
