CREATE OR ALTER PROC deleteUserProc(@userId VARCHAR(250))
AS
BEGIN
DELETE FROM usersTable WHERE userId = @userId
END