CREATE OR ALTER PROCEDURE getAllUsersProc
AS
BEGIN
    SET NOCOUNT ON;
    
    -- Retrieve all users from the usersTable
    SELECT *  FROM usersTable;
END
