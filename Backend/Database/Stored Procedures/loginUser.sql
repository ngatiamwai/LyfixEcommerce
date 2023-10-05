CREATE OR ALTER PROCEDURE loginUserProc(@email VARCHAR(200))
AS
BEGIN
    SELECT * FROM usersTable WHERE email = @email
END