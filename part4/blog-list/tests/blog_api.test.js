
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);
const Blog = require('../models/blog');
const BlogHelper = require('./test_helper');

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(BlogHelper.initialBlogs);
});

describe('Initial Tests', () => {
  test('Blogs are returned as JSON', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('All blogs are returned', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body).toHaveLength(BlogHelper.initialBlogs.length);
  });
});

describe('GET Request Tests', () => {
  test('unique indentifiers are named id', async () => {
    const response = await api.get('/api/blogs');

    response.body.forEach((blog) => {
      expect(blog.id).toBeDefined();
    });
  });

  test('fetch blog by existing id', async () => {
    const allInitialBlogs = await BlogHelper.blogsInDb();
    const blogToView = allInitialBlogs[1];

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(resultBlog.body).toEqual(blogToView);
  });

  test('fetch blog by non-existing id', async () => {
    const validNonexistingId = await BlogHelper.nonExistingId();

    await api
      .get(`/api/blogs/${validNonexistingId}`)
      .expect(404);
  });

  test('fetch blog by malformatted id', async () => {
    const malformattedId = '12345';

    await api
      .get(`/api/blogs/${malformattedId}`)
      .expect(400);
  });
});

describe('POST Request Tests', () => {
  test('POST requests create a new blog post', async () => {
    const newBlog = {
      _id: '5a422a851b54a676234d17f7',
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
      __v: 0,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(BlogHelper.initialBlogs.length + 1);
  });

  test('Set likes to 0 if likes property is missing', async () => {
    const noLikePropertyBlog = {
      title: 'No Likes Blog',
      author: 'John Doe',
      url: 'https://example.com/',
    };

    const response = await api
      .post('/api/blogs')
      .send(noLikePropertyBlog);

    expect(response.status).toBe(201);
    expect(response.header['content-type']).toMatch(/application\/json/);

    const newBlog = await Blog.findById(response.body.id);
    expect(newBlog.likes).toBe(0);
  });

  test('Respond with bad request if title property is missing', async () => {
    const noTitlePropertyBlog = {
      author: 'No Title John',
      url: 'https://example.com/',
    };

    await api
      .post('/api/blogs')
      .send(noTitlePropertyBlog)
      .expect(400);
  });

  test('Respond with bad request if url property is missing', async () => {
    const noUrlPropertyBlog = {
      title: 'No Url Blog',
      author: 'Uncle Url',
    };

    await api
      .post('/api/blogs')
      .send(noUrlPropertyBlog)
      .expect(400);
  });
});

describe('DELETE Request Tests', () => {
  test('Delete existing blog', async () => {
    const allInitialBlogs = await BlogHelper.blogsInDb();
    const blogToDelete = allInitialBlogs[1];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204);

    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(BlogHelper.initialBlogs.length - 1);
  });

  test('Delete non-existing blog', async () => {
    const nonExistingId = await BlogHelper.nonExistingId();

    await api
      .delete(`/api/blogs/${nonExistingId}`)
      .expect(204);

    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(BlogHelper.initialBlogs.length);
  });
});

describe('PUT Request Tests', () => {
  test('Update existing blog', async () => {
    const allInitialBlogs = await BlogHelper.blogsInDb();
    const blogToUpdate = allInitialBlogs[0];

    const updatedBlog = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(
        {
          title: blogToUpdate.title,
          author: blogToUpdate.author,
          url: blogToUpdate.url,
          likes: blogToUpdate.likes + 1,
        },
      )
      .expect(200);

    expect(updatedBlog.body.likes).toBe(blogToUpdate.likes + 1);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
