const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

const Person = require('./models/people');

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method);
  console.log('Path:  ', request.path);
  console.log('Body:  ', request.body);
  console.log('---');
  next(); // Yield control to the next middleware
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({error: 'unknown endpoint'});
};

const errorHandler = (error, request, response, next) => {
  console.log(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({error: 'malformatted id'});
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({error: error.message});
  }
  next(error);
};

app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use(express.static('build'));

app.post('/api/persons', (request, response, next) => {
  const body = request.body;

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save()
      .then((savedPerson) => {
        response.json(savedPerson);
      })
      .catch((error) => next(error));
});

app.get('/info', (request, response) => {
  Person.find({}).then((persons) => {
    const info = {
      text: `Phonebook has info for ${persons.length} people`,
      date: new Date(),
    };
    response.send(`<p>
    Phonebook has info for ${persons.length} people <br><br>
    ${info.date}
    </p>`);
  });
});

app.get('/api/persons', (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id)
      .then((person) => {
        if (person) {
          response.json(person);
        } else {
          response.status(404).end();
        }
      })
      .catch((error) => next(error));
});

app.put('/api/persons/:id/:number/:name', (request, response, next) => {
  const person = {
    name: request.params.name,
    number: request.params.number,
  };

  // findByIdAndUpdate receives a reguar JS object,
  // NOT a new person object created with Person constructor
  Person.findByIdAndUpdate(
      request.params.id,
      person,
      {new: true, runValidators: true, context: 'query'},
  )
      .then((updatedPerson) => {
        response.json(updatedPerson);
      })
      .catch((error) => next(error));
});

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
      .then((result) => {
        response.status(204).end();
        console.log(result.name, 'was removed from the phonebook');
      })
      .catch((error) => next(error));
});

app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
