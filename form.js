const express = require('express');
const fs = require('fs');
const port = process.env.PORT || 5000;

const app = express();
// Set EJS as the view engine
app.set('view engine', 'ejs');


app.use(express.json()); // accept data in json form
app.use(express.urlencoded())
app.use(express.static('main'));

// Read the JSON File
fs.readFile("data.json", 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
});

// Route to render the HTML form
app.get('/form', (req, res) => {
    res.sendFile(__dirname + '/main/index.html');
});

app.post('/formPost', (req, res) =>{
    console.log(req.body);
});

app.listen(port, () =>{
    console.log("Server Started")
});