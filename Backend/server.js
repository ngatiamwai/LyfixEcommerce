const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { userRouter } = require('./Routes/userRouter')

const app = express()

app.use(express.json())
// app.use(cors())
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())
app.use('/user', userRouter)

// app.use((req, res, next) => {
//     res.status(500).json({error : err.message});
// })
app.listen(1000, ()=>{
    console.log('Listening on port 1000');
})