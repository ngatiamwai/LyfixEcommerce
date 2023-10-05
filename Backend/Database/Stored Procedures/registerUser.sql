CREATE OR ALTER PROCEDURE registerUserProc
    @userId VARCHAR(250),
    @firstName VARCHAR(250),
    @lastName VARCHAR(250),
    @email VARCHAR(200),
    @password VARCHAR(255),
    @phoneNumber VARCHAR(20),
    @role VARCHAR(20)
AS
BEGIN

    --     -- Insert the new user into the Users table
        INSERT INTO usersTable (userId, firstName, lastName, email, password, phoneNumber, registrationDate, role)
        VALUES (@userId, @firstName, @lastName, @email, @password, @phoneNumber, GETDATE(), @role);

    END