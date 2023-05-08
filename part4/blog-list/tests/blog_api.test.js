const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const BlogHelper = require('./test_helper')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(BlogHelper.initialBlogs)
})

describe('Initial Tests', () => {
    test('Blogs are returned as JSON', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('All blogs are returned', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(BlogHelper.initialBlogs.length)
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})
