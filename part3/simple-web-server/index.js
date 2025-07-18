const express = require('express');
const app = express();

app.use(express.json())


let notes = [
    {
        id: "1",
        content: "HTML is easy",
        important: true
    },
    {
        id: "2",
        content: "Browser can execute only JavaScript",
        important: false
    },
    {
        id: "3",
        content: "GET and POST are the most important methods of HTTP protocol",
        important: true
    }
]

// const app = http.createServer((request, response) => {
//     response.writeHead(200, {'Content-Type': 'application/json'})
//     response.end(JSON.stringify(notes));
// })

app.get('/', (request, response) => {
    response.send('Helloe backend');
})

app.get('/api/notes', (request, response) => {
    response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
    const id = request.params.id;
    const note = notes.find(note => note.id === id);

    if (!note) {
        response.status(404).end();
    }

    return response.json(note);
})

app.delete('/api/notes/:id', (request, response) => {
    const id = request.params.id;
    const notes = notes.filter(note => note.id !== id);

    return response.status(204).end();

})

app.post('/api/notes', (request, response) => {
    const note = request.body;
    console.log(note);
    response.json(note);
})

const PORT = 3001;
app.listen(PORT, () => {
    console.log('Server running at port', PORT)
});

// console.log('Server running at port: ', PORT);