const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')
const morgan = require('morgan')
const app = express()
const db = require('./config/db')
dotenv.config({ path: './config/config.env' })
const transactions = require('./routes/transaction')

db.connect((err) => {
    if (err) {
        console.error(`Db Error ${err}`.red.bold)
    } else {
        console.log(`db connected`.cyan.underline.bold);
    }
})
app.use(express.json({ extended: true }))
app.use(express.urlencoded({ extended: true }))

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use('/api/v1/transations', transactions)


if (process.env.NODE_ENV === "production") {
    app.use(express.static('client/build'))

    app.get('/', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
    })
    app.get('*',(req,res)=>{
        res.send("Error")
    })
}


const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))


