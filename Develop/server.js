const express = require('express');
const fs = require('fs');

const app = express();
const port = 8080;

app.get('/notes', async (req, res) => {
    res.send (await fs.promises.readFile('./public/notes.html', 'utf-8'));
});

app.get('*', async (req, res) => {
    res.send (await fs.promises.readFile('./public/index.html', 'utf-8'));
});




app.listen(port, () => {
    console.log(`Server listening on port: ${port}`)
})