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

module.exports= {
    createUsersTable
}