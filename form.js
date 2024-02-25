const express = require('express');
const fs = require('fs');
const port = process.env.PORT || 5000;

const app = express();
// Set EJS as the view engine
app.set('view engine', 'ejs');


app.use(express.json()); // accept data in json form
app.use(express.urlencoded({ extended: true }));
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

app.post('/form', (req, res) =>{

    const formData = req.body;
    console.log('Form data received:', formData);

    res.redirect("/results.html");
});

app.listen(port, () =>{
    console.log("Server Started")
});