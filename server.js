const express = require('express');
const path = require('path');
const fs = require('fs');

//creates a unique ID for each Note
const uniqid = require('uniqid');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

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
    res.json(JSON.parse(fs.readFileSync("./public/db/db.json")));
});

//wildCard
app.get('*', (req, res) =>{
    res.sendFile(path.join(__dirname,'public/index.html'));
});

app.post('/api/notes' , (req, res) => {
    let data = JSON.parse(fs.readFileSync("./public/db/db.json"));
    let note = req.body;
    
    //uniqid.proccess creates a unique 12 byte id based on the time and process ID 
    note.id = uniqid.process();
    data.push(note);

    //writes file to db with new data
    fs.writeFileSync("./public/db/db.json", JSON.stringify(data));

    res.json(data);
});

app.delete('/api/notes/:id', (req, res) => {
    let data = JSON.parse(fs.readFileSync("./public/db/db.json"));
    
    //selects note by ID 
    let noteId = req.params.id.toString();

    //filters out note based on its uniqid 
    data = data.filter(note => note.id.toString() !== noteId);

    //writes file to db with new data
    fs.writeFileSync("./public/db/db.json", JSON.stringify(data));
    res.json(data);
});