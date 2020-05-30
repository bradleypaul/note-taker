const express = require('express');
const path = require('path');
// uniqid makes unique ids off of time, package, and process.
// should be very slim chance that this generates two identical ids
const uniqid = require('uniqid');

// body parser for req.body
const bodyParser = require('body-parser');

const {get, set} = require('./db');

const app = express();
const port = 8080;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// api routes
app.get('/api/notes', async (req, res) => {
    res.send(await get());
});

app.post('/api/notes', async (req, res) => {
    const note = req.body;
    note.id = uniqid();
    const notesDB = await get();

    // combine db with new note
    await set([...notesDB, note])

    // send result to api
    res.send(note);
});

app.delete('/api/notes/:noteId', async (req, res) => {
    const notesDB = (await get()).filter(item => item.id === req.params.id);

    await set(notesDB);

    // send 204 because it's ok, no need to send a payload though.
    res.sendStatus(204); 
});

// page routing
app.get('/notes', async (req, res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get('*', async (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.listen(port, () => {
    console.log(`Server listening on port: ${port}`)
});