const mssql = require('mssql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const { v4 } = require('uuid');
const { sqlConfig } = require('../Config/config');
const { registerSchema, loginSchema } = require('../Validators/validators');

dotenv.config();

const registerUser = async (req, res) => {

    try {
        const userId = v4();
        const { firstName, lastName, email, phoneNumber, password } = req.body;

        // console.log(firstName, lastName, email, phoneNumber, password, role);

        const { error } = registerSchema.validate(req.body);

        if (error) {
          return res.status(422).json(error.details);
        }

        const hashedPassword = await bcrypt.hash(password, 5);
        const pool = await mssql.connect(sqlConfig);

        const result = await pool
            .request()
            .input('userId', userId)
            .input('firstName', mssql.VarChar, firstName)
            .input('lastName', mssql.VarChar, lastName)
            .input('email', mssql.VarChar, email)
            .input('phoneNumber', mssql.VarChar, phoneNumber)
            .input('password', mssql.VarChar, hashedPassword)
            .input('role', mssql.VarChar, 'user')
            .execute('registerUserProc');

            console.log(result)
        if (result.rowsAffected[0] == 1) {
            return res.status(200).json({ message: "User registered successfully" });
        } else {
            return res.status(400).json({ message: "Registration failed" });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      console.log(req.body);
      const { error } = loginSchema.validate(req.body);
      if (!email || !password) {
        return res.status(400).json({
          error: "Please input all values",
        });
      }
  
      if (error) {
        return res.status(422).json(error.details);
      }
  
      const pool = await mssql.connect(sqlConfig);
  
      const user = (
        await pool
          .request()
          .input("email", mssql.VarChar, email)
          .execute("loginUserProc")
      ).recordset[0];
  
      if (!user) {
        return res.status(404).json({ message: "Email does not exist in the system, Please use a valid email address" });
      }
   
      const comparePwd = await bcrypt.compare(password, user.password);
  
      if (!comparePwd) {
        return res.status(400).json({ message: "Incorrect password" });
      }
  
      const {  id ,  role, ...payload } = user;
      const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "36000s" }); 
      let message = "Logged in";
  
      if (user.role === "admin") {
        message = "Admin logged in";
      }
  
      return res.status(200).json({ id , role,  message,  token });
  
    } catch (error) {
      if (error.message.includes("duplicate key value")) {
        return res.status(400).json({ message: "Email already exists" });
      }
      return res.status(500).json({ error: error.message });
    }
  };

module.exports = {
    registerUser,
    loginUser
};
