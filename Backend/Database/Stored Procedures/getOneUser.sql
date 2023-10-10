CREATE OR ALTER PROC getOneUserProc(
    @userId VARCHAR(250)
)
AS 
BEGIN
SELECT * FROM usersTable WHERE userId = @userId
END