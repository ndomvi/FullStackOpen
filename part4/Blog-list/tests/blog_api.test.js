const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  await Promise.all(blogObjects.map(blog => blog.save()))

  // for (const blog of helper.initialBlogs) {
  //   const newBlog = new Blog(blog)
  //   await newBlog.save()
  // }
})

describe('GET', () => {
  test('api returns blogs as JSON', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('returns blogs correctly', async () => {
    const blogs = await helper.getBlogs()
    expect(blogs.length).toBe(helper.initialBlogs.length)
  })

  test('blogs have id field (not _id)', async () => {
    const blogs = await helper.getBlogs()
    expect(blogs[0].id).toBeDefined()
    expect(blogs[0]._id).not.toBeDefined()
  })
})

describe('POST', () => {
  describe('valid requests', () => {
    test('valid blog can be addded', async () => {
      const newBlog = { title: 'testblog', author: 'testauthor', url: 'http://testurl.com', likes: 213 }
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogs = await helper.getBlogs()
      expect(blogs.length).toBe(helper.initialBlogs.length + 1)
      expect(
        blogs.map(blog => {
          delete blog.id
          return blog
        })
      ).toContainEqual(newBlog)
    })

    test('"likes" field is set to 0 if not specified in the request', async () => {
      const newBlog = { title: 'testblog', author: 'testauthor', url: 'http://testurl.com' }
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogs = await helper.getBlogs()
      expect(
        blogs.map(blog => {
          delete blog.id
          return blog
        })
      ).toContainEqual({ ...newBlog, likes: 0 })
    })
  })

  describe('invalid requests', () => {
    test('blog without title is not added', async () => {
      const newBlog = { author: 'testauthor', url: 'http://testurl.com', likes: 213 }
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      const res = await api.get('/api/blogs')
      expect(res.body.length).toBe(helper.initialBlogs.length)
    })

    test('blog without URL is not added', async () => {
      const newBlog = { title: 'testblog', author: 'testauthor', likes: 213 }
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      const res = await api.get('/api/blogs')
      expect(res.body.length).toBe(helper.initialBlogs.length)
    })
  })
})

describe('PUT', () => {
  test('updates blog correctly', async () => {
    let res = await api.get('/api/blogs')
    const updatedBlog = { ...res.body[0], likes: res.body[0].likes + 1337 }
    await api.put(`/api/blogs/${updatedBlog.id}`).send(updatedBlog)

    res = await api.get('/api/blogs')
    expect(res.body.length).toBe(helper.initialBlogs.length)
    expect(res.body).toContainEqual(updatedBlog)
  })
})

describe('DELETE', () => {
  test('deletes blog correctly', async () => {
    let res = await api.get('/api/blogs')

    const removedBlog = res.body[0]
    await api.delete(`/api/blogs/${removedBlog.id}`)

    res = await api.get('/api/blogs')
    expect(res.body.length).toBe(helper.initialBlogs.length - 1)
    expect(res.body).not.toContainEqual(removedBlog)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
