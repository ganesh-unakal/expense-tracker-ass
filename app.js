const express = require('express')

var cors = require('cors')
const sequelize = require('./util/database')

const port = 3000;
const app = express()
app.use(cors());

const authRouter = require('./routes/authRoutes')

app.use(express.json())
app.use(authRouter)

sequelize
.sync()
.then(result => {
    app.listen(port,() => {
        console.log(`server is runnning on ${port}`)
    })
}).catch(err => {
    console.log(err)
})

