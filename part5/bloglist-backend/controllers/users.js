const usersRouter = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

/*
* To create new users, send POST request to /api/users/ with format:
* {
*    "username": "root",
*    "name": "Superuser",
*    "password": "salainen"
* }
*/

usersRouter.get('/', async (request, response) => {
  /*
  *   parameter passed in populate() defines that the:
  *   ids referencing blog objects in the blogs field
  *   of the user document will be replaced by the referenced blog documents
  */
  const users = await User
    .find({})
    .populate('blogs', {
      title: 1, author: 1, url: 1, likes: 1,
    });

  response.json(users);
});

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body;

  if (password === '') {
    response.status(400).send({ error: 'Please fill in the `password` field' });
  }
  if (password.length < 3) {
    response.status(400).send({ error: '`password` has to be at least 3 characters long' });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

module.exports = usersRouter;
