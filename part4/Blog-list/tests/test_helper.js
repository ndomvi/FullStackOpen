const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  // ALL LINKS ARE RANDOM
  {
    title: 'blog1',
    author: 'author1',
    url: 'http://test.com',
    likes: 14
  },
  {
    title: 'blog2',
    author: 'author2',
    url: 'http://anothertest.com',
    likes: 21
  },
  {
    title: 'blog3',
    author: 'author3',
    url: 'http://testtest.com',
    likes: 43
  },
  {
    title: 'blog4',
    author: 'author4',
    url: 'http://testornottest.com',
    likes: 123
  }
]

const initialUsers = [{ username: 'testuser1', passwordHash: 'testpassword1' }]

const getBlogs = async () => {
  const list = await Blog.find({})
  return list.map(blog => blog.toJSON())
}

const getUsers = async () => {
  const list = await User.find({})
  return list.map(user => user.toJSON())
}

module.exports = { initialBlogs, initialUsers, getBlogs, getUsers }
