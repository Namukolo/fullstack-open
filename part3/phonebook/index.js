const express = require('express');
const morgan = require('morgan');


const app = express();

morgan.token('request-data', function getRequestData(req) {
    return JSON.stringify(req.body)
})

app.use(morgan(`:method :url :status :res[content-length] - :response-time ms :request-data`));

app.use(express.json())

const persons = [
    {
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": "4",
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]


app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/info', (request, response) => {
    const requestTime = new Date();


    const responseContent = `<div>
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${requestTime}</p>
    </div>`

    response.send(responseContent)
})

app.get('/api/persons/:id', (request, response) => {
    const requestId = request.params.id;

    const person = persons.find(person => person.id === requestId);

    if (!person) { response.status(404).end(); }

    response.json(person);
})

app.delete('/api/persons/:id', (request, response) => {
    const requestId = request.params.id;
    const isID = persons.find(requestId);

    if (!isID) {
        response.status(404).end();
    }

    const filteredPersons = persons.filter(person => person.id !== requestId);

    response.json(filteredPersons);
})

app.post('/api/persons', (request, response) => {
    try {
        const newPerson = request.body;
        const { name, number } = newPerson;
        const entryExists = persons.find(person => person.name.toLowerCase() === name.toLowerCase());

        if (!name || !number) {
            const errorMsg = number ? 'number is missing' : 'name is missing';
            throw new Error(errorMsg);
        }


        if (entryExists) {
            throw new Error('name must be unique');
        }

        const newPersonId = Math.floor(Math.random() * 1000);
        newPerson.id = newPersonId;

        persons.push(newPerson);

        response.status(201).json({message: 'Entry added successfully', data: newPerson});
    } catch (error) {
        response.status(400).json({ error: error.message })
    }
})


app.listen('3001', () => {
    console.log('we got the server running baby');
})