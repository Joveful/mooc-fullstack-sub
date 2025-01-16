const { test, after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('blogs returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('blogs contain 5 entries', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, 5)
})

after(async () => {
  await mongoose.connection.close()
})
