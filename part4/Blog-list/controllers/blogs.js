const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (_, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
})

blogRouter.post('/', async (req, res) => {
  const body = req.body.likes ? req.body : { ...req.body, likes: 0 } // add likes field if it is missing

  const newBlog = new Blog(body)
  try {
    const result = await newBlog.save()
    res.status(201).json(result)
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
