const mssql = require("mssql");
const { sqlConfig } = require("../../Config/config");

//usersTable
const createUsersTable = async () => {
  try {
    const table = `
    CREATE TABLE Users (
        userId INT PRIMARY KEY,
        firstName VARCHAR(250) NOT NULL,
        lastName VARCHAR(250) NOT NULL,
        email VARCHAR(200) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL, 
        phoneNumber VARCHAR(20),
        registrationDate DATETIME DEFAULT GETDATE(),
        role VARCHAR(20) NOT NULL DEFAULT 'user'
    );`

    const pool = await mssql.connect(sqlConfig);

    await pool.request().query(table, (err) => {
      if (err instanceof mssql.RequestError) {
        console.log(err.message);
      } else {
        console.log("Table created Successfully");
      }
    });
  } catch (error) {
    return { Error: error };
  }
};

const productsTable = async ()=>{
  try {
    const productsTable = `
    BEGIN TRY
CREATE TABLE productsTable(
        productId VARCHAR(200) PRIMARY KEY,
        productName VARCHAR(255) NOT NULL,
        productDescription TEXT,
        productPrice DECIMAL(10, 2) NOT NULL,
        productCategory VARCHAR(100),
        productImage VARCHAR(255),
        productNum INT NOT NULL DEFAULT 0, 
        createdAt DATETIME DEFAULT GETDATE(),
        updatedAt DATETIME
    );
END TRY
BEGIN CATCH
    THROW 50001, 'Table already exists!', 1;
END CATCH;`
    
const pool = await mssql.connect(sqlConfig);

    await pool.request().query(productsTable, (err) => {
      if (err instanceof mssql.RequestError) {
        console.log(err.message);
      } else {
        console.log("Table created Successfully");
      }
    });
  } catch (error) {
    return { Error: error }
  }
}

module.exports= {
    createUsersTable,
    productsTable
}