const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

const { db } = require('./public/db/db');

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname,'public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    res.json(JSON.parse(fs.readFileSync("./public/db/db.json", "utf8")));
});

app.post('/api/notes' , (req, res) => {
    console.log('POST');
});

app.delete('/api/notes', (req, res) => {

});