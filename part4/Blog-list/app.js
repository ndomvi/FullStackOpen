const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

const config = require('./utils/config')
const middleware = require('./utils/middleware')

const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')

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
if (process.env.NODE_ENV !== 'test') app.use(middleware.requestLogger)

app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)

module.exports = app
