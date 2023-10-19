const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 5000 // It allows me to access my port variable in the file .env 
//or 5000 in case my file is not found

connectDB()

const app = express() // Here I am initializing express


app.use(express.json())
app.use(express.urlencoded({extended: false }))

app.use('/api/goals', require('./routes/goalRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))