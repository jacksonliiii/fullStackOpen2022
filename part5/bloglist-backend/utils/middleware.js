/*
* Middleware sits between the client and the server and
* intercepts and processes requests and responses. This adds
* functionality to the application such as handling authentication,
* logging, error handling and parsing reuqest bodies.
*
* By breaking down application logic into smaller and reusable
* middleware functions, code becomes more maintable and scalable.
*/

const logger = require('./logger');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method);
  logger.info('Path:  ', request.path);
  logger.info('Body:  ', request.body);
  logger.info('---');
  next();
};

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

const tokenExtractor = (request, response, next) => {
  request.token = getTokenFrom(request)
  next()
}

const userExtractor = async (request, response, next) => {
  const token = getTokenFrom(request)

  if (token) {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
  
    request.user = await User.findById(decodedToken.id)
  }

  next()
}

const unknownEndpoint = (request, response) => response.status(404).send({ error: 'unknown endpoint' });

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  switch (error.name) {
    case 'CastError':
      return response.status(400).send({ error: 'malformatted id' });
    case 'ValidationError':
      return response.status(400).json({ error: error.message });
    case 'JsonWebTokenError':
      return response.status(400).json({ error: error.message });
    default:
      next(error);
  }
};

module.exports = {
  requestLogger, tokenExtractor, userExtractor, unknownEndpoint, errorHandler
};
