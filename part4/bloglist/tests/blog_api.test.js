const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')

const helper = require('./test_util')

const Blog = require('../models/blog')
const User = require('../models/user')


beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(helper.blogs[0])
  await blogObject.save()

  blogObject = new Blog(helper.blogs[1])
  await blogObject.save()

  blogObject = new Blog(helper.blogs[2])
  await blogObject.save()

  blogObject = new Blog(helper.blogs[3])
  await blogObject.save()

  blogObject = new Blog(helper.blogs[4])
  await blogObject.save()
})

test('helper.blogs returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('helper.blogs contain 5 entries', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, 5)
})

test('blog contains id field', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body[0]._id, undefined)
  assert.strictEqual(response.body[0].id, helper.blogs[0]._id)
})

test('add a new blog', async () => {
  const newBlog = {
    title: 'New blog',
    author: 'New author',
    url: 'fakesite.org',
    likes: 12
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const contents = response.body.map(r => r.title)

  assert.strictEqual(response.body.length, helper.blogs.length + 1)
  assert(contents.includes('New blog'))
})

test('likes set to zero', async () => {
  const newBlog = {
    title: 'New blog',
    author: 'John Writer',
    url: 'realwebsite.com'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body[5].likes, 0)
})

test('blog with title or url missing is not added', async () => {
  const missingTitle = {
    author: 'John Writer',
    url: 'realwebsite.com'
  }
  const missingUrl = {
    title: 'New blog',
  }

  await api
    .post('/api/blogs')
    .send(missingTitle)
    .expect(400)

  await api
    .post('/api/blogs')
    .send(missingUrl)
    .expect(400)

  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, helper.blogs.length)
})

test('delete a blog', async () => {
  const response = await api.get('/api/blogs')
  const id = response.body[0].id

  await api
    .delete(`/api/blogs/${id}`)
    .expect(204)

  const newResponse = await api.get('/api/blogs')
  assert.strictEqual(newResponse.body.length, helper.blogs.length - 1)
})

test('update a blog', async () => {
  const updatedBlog = {
    likes: 15
  }

  const id = helper.blogs[0]._id
  await api
    .put(`/api/blogs/${id}`)
    .send(updatedBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body[0].likes, 15)
})

describe('test with one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('bossman', 10)
    const user = new User({ username: 'root', password: passwordHash })

    await user.save()
  })

  test('add new user successfully', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'catstrangler',
      name: 'John Test',
      password: 'pword123'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })
})

after(async () => {
  await User.deleteMany({})
  await mongoose.connection.close()
})
