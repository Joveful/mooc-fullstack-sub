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

describe('5 items in database', () => {


  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

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

    userObject = new User(helper.initialUsers[0])
    await userObject.save()
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

  describe('test with user logged in', async () => {

    test('add a new blog', async () => {
      const newBlog = {
        title: 'New blog',
        author: 'New author',
        url: 'fakesite.org',
        likes: 12
      }

      const login = await api.post('/api/login').send({ username: 'root', password: 'admin' })

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${login.body.token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const response = await api.get('/api/blogs')

      const contents = response.body.map(r => r.title)

      assert.strictEqual(response.body.length, helper.blogs.length + 1)
      assert(contents.includes('New blog'))
    })

    test('blog add fails without token', async () => {
      const newBlog = {
        title: 'New blog',
        author: 'John Writer',
        url: 'realwebsite.com'
      }

      const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)

      assert.strictEqual(response.body.error, 'invalid token')
    })

    test('likes set to zero', async () => {
      const newBlog = {
        title: 'New blog',
        author: 'John Writer',
        url: 'realwebsite.com'
      }

      const login = await api.post('/api/login').send({ username: 'root', password: 'admin' })

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${login.body.token}`)
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

      const login = await api.post('/api/login').send({ username: 'root', password: 'admin' })

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${login.body.token}`)
        .send(missingTitle)
        .expect(400)

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${login.body.token}`)
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
        .set('Authorization', `Bearer ${process.env.TOKEN}`)
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
  })
})
// TODO: figure out why I wrote these tests,
// because I don't know why they are here.
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

  test('test duplicate username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'super user',
      password: 'goodpw12'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()

    assert(result.body.error.includes('username already taken'))
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })
})

after(async () => {
  await User.deleteMany({})
  await mongoose.connection.close()
})
