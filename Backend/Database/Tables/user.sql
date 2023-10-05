CREATE TABLE usersTable (
    userId VARCHAR(250) PRIMARY KEY,
    firstName VARCHAR(250) NOT NULL,
    lastName VARCHAR(250) NOT NULL,
    email VARCHAR(200) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL, 
    phoneNumber VARCHAR(20),
    registrationDate DATETIME DEFAULT GETDATE(),
    role VARCHAR(20) NOT NULL DEFAULT 'user'
);

SELECT * FROM usersTable

Drop table Users