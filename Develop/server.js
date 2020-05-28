const express = require('express');
const fs = require('fs');

const app = express();
const port = 8080;

app.use(express.static(`${__dirname}`))

app.get('/notes', async (req, res) => {
    console.log(`${__dirname}/public/index.html`)
    res.sendFile(`${__dirname}/public/notes.html`);
});

app.get('/api/notes', async(req, res) => {
    console.log("Got DB");
    const json = await fs.promises.readFile('./db/db.json', 'utf-8');
    // console.log()
    res.send(JSON.parse(json));
});

app.post('/api/notes', async(req, res) => {
    res.send (await fs.promises.readFile('./db/db.json', 'utf-8'));
});

app.get('*', async (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`);
});



app.listen(port, () => {
    console.log(`Server listening on port: ${port}`)
})