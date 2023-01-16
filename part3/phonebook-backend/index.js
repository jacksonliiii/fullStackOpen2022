
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

// Middleware for handling request and response objects
morgan.token('body', (req) => { return JSON.stringify(req.body) })

app.use(express.static('build'))
app.use(express.json())
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


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
    },
    { 
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122",
      "id": 4
    }
]

const generateID = () => {
    return Math.floor(Math.random() * 100)
}

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
    
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        response.status(200).send(person)
    } else {
        response.status(404).end()
    }
})

app.post('/api/persons', (request, response) => {
    
    const body = request.body

    const person = {
        name: body.name,
        number: body.number,
        id: generateID()
    }
    
    persons = persons.concat(person)
    response.json(person)
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

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
