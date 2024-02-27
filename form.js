const express = require('express');
const fs = require('fs');
const port = process.env.PORT || 5000;

const app = express();
// Set EJS as the view engine
app.set('view engine', 'ejs');


app.use(express.json()); // accept data in json form
app.use(express.urlencoded({ extended: true }));
app.use(express.static('main'));

let jdata;

// Read the JSON File
fs.readFile("data.json", 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    jdata = JSON.parse(data);
    console.log(jdata);
});

// Route to render the HTML form
app.get('/form', (req, res) => {
    res.sendFile(__dirname + '/main/index.html');
});

app.get('/api/question', (req, res)=> {
    res.json(jdata)
});

app.post('/form/results', (req, res) =>{

    const new_result = req.body;
    console.log('Form data received:', new_result);

    let all_results;

    fs.readFile("results.json", 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }
        all_results = JSON.parse(data);
        process_results(all_results, new_result)
    });
});

function process_results(all_results, new_result){
    // Passes in the JSON data from the results file and the form.
    const options = all_results.options;
    const index = options.findIndex(obj => obj.optionId === parseInt(new_result.optionId));

    // Modify the Item and Write to a File
    options[index].optionChosen = options[index].optionChosen + 1;
    console.log(all_results);

    const jsonString = JSON.stringify(all_results, null, 2); // Convert JSON object to string with indentation

    fs.writeFile('results.json', jsonString, 'utf8', (err) => {
    if (err) {
        console.error('Error writing JSON file:', err);
    } else {
        console.log('JSON file has been saved.');
    }
    });
}

app.listen(port, () =>{
    console.log("Server Started")
});