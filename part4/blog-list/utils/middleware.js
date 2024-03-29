/*
* Middleware sits between the client and the server and
* intercepts and processes requests and responses. This adds
* functionality to the application such as handling authentication,
* logging, error handling and parsing reuqest bodies.
*
* By breaking down application logic into smaller and reusable
* middleware functions, code becomes more maintable and scalable
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

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('Authorization');
  if (authorization && authorization.startsWith('Bearer ')) {
    logger.info('Extracting token');
    request.token = authorization.substring(7);
  }

  next();
};

// TODO: Remove duplicate code found similarly in tokenExtractor() above
const userExtractor = async (request, response, next) => {
  if (!request.token) {
    return response.status(401).json({ error: 'token missing' });
  }

  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'invalid token' });
  }
  
  request.user = await User.findById(decodedToken.id);

  next();
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
