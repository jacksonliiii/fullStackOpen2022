/*
*******************************************************************************
*   Setup
*******************************************************************************
*/

const express = require('express')
const app = express()
require('express-async-errors')
const cors = require('cors')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

/*
*******************************************************************************
*   Connect to MongoDB
*******************************************************************************
*/

logger.info('Establishing connection to MongoDB...')

mongoose.connect(config.MONGODB_URI)
.then(() => {
  logger.info('Connected to MongoDB')
})
.catch((error) => {
  logger.error('Error connecting to MongoDB:', error.message)
})

/*
*******************************************************************************
*   Use Middlewares
*******************************************************************************
*/

app.use(cors())
app.use(express.json())

app.use(middleware.requestLogger)
app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app