/*
*   A router object is an isolated instance
*   of middleware and routes. 'mini-app' for
*   perform middleware and routing functions.
*/

const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const { userExtractor } = require('../utils/middleware');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1, id: 1 });

  return response.json(blogs);
});

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id);

  if (blog) {
    return response.status(200).json(blog);
  }
  return response.status(404).end();
});

blogsRouter.post('/', userExtractor, async (request, response) => {
  const { title, author, url, likes } = request.body
  const user = request.user

  if (!user) {
    return response.status(401).json({ error: 'operation not permitted' })
  }

  const blog = new Blog({
    title,
    author,
    url,
    likes: likes ? likes : 0,
    user: user.id
  })

  const createdBlog = await blog.save()
  await blog.populate('user', { username: 1, name: 1, id: 1 })

  user.blogs = user.blogs.concat(createdBlog._id)
  await user.save()
  response.status(201).json(createdBlog)
})

blogsRouter.put('/:id', (request, response, next) => {
  const { title, author, url, likes, user } = request.body

  const blog = {
    title,
    author,
    url,
    user: user.id,
    likes
  }

  Blog.findByIdAndUpdate(
    request.params.id,
    blog,
    { new: true }
  )
    .then((updatedBlog) => {
      response.json(updatedBlog);
    })
    .catch((error) => next(error));

})

blogsRouter.delete('/:id', (request, response, next) => {
  Blog
    .findByIdAndDelete(request.params.id)
    .then((result) => {
      response.status(204).end();
      console.log(result.title, 'was removed from the phonebook');
    })
    .catch((error) => next(error));
});

module.exports = blogsRouter;
