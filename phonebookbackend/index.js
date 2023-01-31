const express = require('express')
var morgan = require('morgan')
const app = express()
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))
const cors = require('cors')
app.use(cors())
app.use(express.static('build'))

morgan.token('content', function (req, res) { 
  return JSON.stringify(req.body)
})

let persons = [
    { 
      "id": 1,
      "name": "arto hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "ada lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "dan abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "mary poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/info', (request, response) => {  
  response.send(`Phonebook has info for ${persons.length} people - 
  ${Date()}`)
})

app.get('/api/persons', (request, response) => {  
  response.send(persons)
})

app.get('/api/persons/:id', (request, response) => {  
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  
  if (person) {    
    response.json(person)  
  } else {    
    response.status(404).end()  
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(p => p.id))
    : 0
  return maxId + 1
}

app.post('/api/persons', (request, response) => {
  const body = request.body
  
  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  if (persons.find(person => person.name === body.name)) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId()
  }

  persons = persons.concat(person)

  response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})