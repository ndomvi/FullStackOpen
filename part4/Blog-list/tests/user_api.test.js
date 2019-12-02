const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')

const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})

  const userObjects = helper.initialUsers.map(user => new User(user))
  await Promise.all(userObjects.map(user => user.save()))
})

describe('POST', () => {
  test('valid user can be added', async () => {
    const newUser = { username: 'newtestuser1', name: 'Test test 1', password: 'newtestpassword1' }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const newUsers = await helper.getUsers()
    expect(newUsers.length).toBe(helper.initialUsers.length + 1)
    expect(newUsers.map(user => user.username)).toContain(newUser.username)
  })

  test('user with duplicate name can not be created', async () => {
    const newUser = { username: helper.initialUsers[0].username, password: 'hello' }
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('expected `username` to be unique')

    const newUsers = await helper.getUsers()
    expect(newUsers.length).toBe(helper.initialUsers.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
