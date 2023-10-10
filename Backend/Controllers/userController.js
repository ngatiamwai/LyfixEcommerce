const mssql =  require('mssql');
const bcypt = require('bcryptjs')
const { sqlConfig } = require('../Config/config');


const getAllUsers = async (req, res)=>{
    try {
        const pool = await (mssql.connect(sqlConfig))

        const allUsers = (await pool.request().execute('getAllUsersProc')).recordset

        res.json({users: allUsers})
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const updateUser = async (req, res) => {
    try {
        const { userId: userId } = req.params; // User ID to be updated
        const {  firstName, lastName, email, phoneNumber  } = req.body;
        // const hashedPassword = await bcypt.hash(password, 5);

        const pool = await mssql.connect(sqlConfig);
        
        const result = await pool.request()
        .input('userId', mssql.VarChar, userId)
        .input('firstName', mssql.VarChar, firstName)
        .input('lastName', mssql.VarChar, lastName)
        .input('email', mssql.VarChar, email)
        .input('phoneNumber', mssql.VarChar, phoneNumber)
        // .input('password', mssql.VarChar, hashedPassword)
        .execute('updateUserProc');
        
        console.log(result);
        if (result.rowsAffected[0] > 0) {
            return res.status(200).json({ message: 'User details updated successfully' });
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}


const getOneUser = async (req, res)=>{
    try {
        const { userId } = req.params

        if (!userId){
            console.log('User not found');
        }

        const pool = await mssql.connect(sqlConfig)

        const result = await pool.request()
        .input('userId', mssql.VarChar, userId)
        .execute('getOneUserProc')

        return res.status(200).json({ User: result.recordset })
            
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const deleteUser = async (req, res)=>{
    try {
        const { userId } = req.params

        if(!userId){
            console.log("User not found");
        }

        const pool = await mssql.connect(sqlConfig)

        const result = await pool.request()
        .input('userId', mssql.VarChar, userId)
        .execute("deleteUserProc")

        if (result.rowsAffected == 1){
            res.json({ message: "User deleted successfully"})
        }
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}


module.exports ={
    getAllUsers,
    updateUser,
    getOneUser,
    deleteUser
}