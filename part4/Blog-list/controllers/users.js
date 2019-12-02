const bcrypt = require('bcrypt')

const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.get('/', async (_, res) => {
  const users = await User.find({}).populate('blogs', { user: 0 })
  res.json(users)
})

userRouter.post('/', async (req, res) => {
  const saltRounds = 11
  const passwordHash = await bcrypt.hash(req.body.password, saltRounds)

  const newUser = new User({ username: req.body.username, name: req.body.name, passwordHash })
  try {
    const result = await newUser.save()
    res.status(201).send(result)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

module.exports = userRouter
