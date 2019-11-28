const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

const config = require('./utils/config')
const blogRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')

const app = express()

console.log('Connecting to MongoDB...')
mongoose
  .connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => {
    console.log('Connected to MongoDB!')
  })
  .catch(err => {
    console.error('Could not connect to MongoDB: ', err)
  })

app.use(cors())
app.use(bodyParser.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogRouter)

module.exports = app
