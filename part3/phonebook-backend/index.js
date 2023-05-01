
const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

const Person = require('./models/people')

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next() // Yield control to the next middleware
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(cors())
app.use(express.json())
app.use(requestLogger)
app.use(express.static('build'))

// Data
let persons = [
    { 
      "name": "Arto Hellas", 
      "number": "040-123456",
      "id": 1
    },
    { 
      "name": "Ada Lovelace", 
      "number": "39-44-5323523",
      "id": 2
    },
    { 
      "name": "Dan Abramov", 
      "number": "12-43-234345",
      "id": 3
    }
]

app.get('/info', (request, response) => {
  
    const info = {
        text: `Phonebook has info for ${persons.length} people`,
        date: new Date()
    }
    response.send(`<p>
    Phonebook has info for ${persons.length} people <br><br>
    ${info.date}
    </p>`)
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
      response.json("Found", person)
    })
})

app.post('/api/persons', (request, response) => {
    const body = request.body
    if (!body.name || !body.number) {
      return response.status(400).json({error: 'name or number is missing'})
    }

    const person = new Person({
        name: body.name,
        number: body.number,
    })
    
    person.save().then(savedPerson => {
      response.json(savedPerson)
    })
})

app.put('/api/persons/:id/:number', (request, response) => {
  
  const id = Number(request.params.id)
  const specifiedPerson = persons.find(person => person.id === id)
  specifiedPerson['number'] = request.params.number
  response.json(specifiedPerson)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
