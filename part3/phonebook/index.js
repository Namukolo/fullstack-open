const express = require('express');
const cors = require('cors');
const morgan = require('morgan');


morgan.token('request-data', function getRequestData(req) {
    console.log(req.body)
    return JSON.stringify(req.body)
})

const app = express();
app.use(cors());
app.use(express.json())
app.use(morgan(`:method :url :status :res[content-length] - :response-time ms :request-data`));
app.use(express.static('build'));


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

// app.delete('/api/persons/:id', (request, response) => {
//     const requestId = request.params.id;
//     console.log('request id:: ', persons);

//     persons.forEach(person => {
//         console.log(person.id === requestId)
//     })

//     // const person = persons.find(person => Number(person.id) === Number(requestId));

//     let person = persons.find((person) => person.id === requestId);
//     person = { ...person, deleted: true }

//     if (!person) {
//         response.status(404).json({ 'message': 'person not found' }).end();
//         return;
//     }

//     const filteredPersons = persons.filter(person => person.id !== requestId);

//     response.json([filteredPersons, person]);
// })


app.delete('/api/persons/:id', (request, response) => {
    const requestId = request.params.id;
    console.log('request id:: ', requestId);

    let personIndex = persons.findIndex((person) => person.id === requestId || Number(person.id) === Number(requestId));

    console.log('personIndex:: ', personIndex)

    if (!personIndex) {
        response.status(404).json({ 'message': 'person not found' }).end();
        return null;
    }

    persons.splice(personIndex, 1);

    // const filteredPersons = persons.filter(person => person.id !== requestId);

    response.json(persons);
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
        newPerson.id = newPersonId.toString();

        persons.push(newPerson);

        response.status(201).json({ message: 'Entry added successfully', data: newPerson });
    } catch (error) {
        response.status(400).json({ error: error.message })
    }
})


app.listen('3001', () => {
    console.log('we got the server running baby');
})