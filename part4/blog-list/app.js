const express = require('express')
const app = express()
const cors = require('cors')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

logger.info('Establishing connection to MongoDB...')

mongoose.connect(config.MONGODB_URI)
.then(() => {
  logger.info('Connected to MongoDB')
})
.catch((error) => {
  logger.error('Error connecting to MongoDB:', error.message)
})

app.use(cors())
app.use(express.json())

app.use(middleware.requestLogger)
app.use('/api/blogs', blogsRouter)

module.exports = app