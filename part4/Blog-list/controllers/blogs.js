const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (_, res) => {
  const blogs = await Blog.find({}).populate('user', { blogs: 0 })
  res.json(blogs)
})

blogRouter.post('/', async (req, res) => {
  const body = req.body
  const user = await User.findById(body.id)

  const newBlog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })

  try {
    const result = await newBlog.save()
    user.blogs.push(result._id)
    await user.save()
    res.status(201).send(result)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

blogRouter.put('/:id', async (req, res) => {
  const blog = req.body
  delete blog.id

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
    res.json(updatedBlog)
  } catch (err) {
    res.status(400).send({ error: err.message })
  }
})

blogRouter.delete('/:id', async (req, res) => {
  try {
    await Blog.findByIdAndRemove(req.params.id)
    res.status(204).end()
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

module.exports = blogRouter
