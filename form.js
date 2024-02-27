// This houses the main bulk of the Node Software
const express = require('express');
const fs = require('fs');
const { stringify } = require('querystring');
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
});

// Route to render the HTML form
app.get('/form', (req, res) => {
    res.sendFile(__dirname + '/main/index.html');
});

app.get('/api/question', (req, res)=> {
    // Gets a Random Question at this Stage
    no = jdata.no_questions;
    polls = jdata.polls;
    q = Math.floor(Math.random() * (no)) + 1
    // Selects the Poll needed
    poll = polls[polls.findIndex(obj => obj.pollId === q)];
    // Sends the Data as JSON to the Front End
    res.json(poll);
});

app.post('/form/results', (req, res) =>{

    // Retrieves the Necessary Results
    const new_result = req.body;

    let all_results;

    // Reads the Results from the Results File
    fs.readFile("results.json", 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }
        all_results = JSON.parse(data);
        // Allow the New Submission to be Added
        code = process_results(all_results, new_result);

        // Let the Front End know all is well
        if (code == 200){
            res.status(200).json({ ok: true });
        }else{
            // This means the Request is Bad
            res.status(400).json({ error: 'Bad Request: Invalid input' });
        }
    });
});

app.get('/api/results', (req, res) => {

    const pollId = req.query.pollId;
    // Read the Results File
    fs.readFile("results.json", 'utf8', (err, data) => {
        let jdata;
        if (err) {
            console.error('Error reading file:', err);
            return;
        }
        try {
            jdata = JSON.parse(data);
          } catch (error) {
            console.error('Error parsing JSON:', error.message);
          }

        // Obtain the Poll that The User Has Voted on
        poll = jdata.polls[jdata.polls.findIndex(obj => obj.pollId === parseInt(pollId))];
        


        // Now Calculate the Percentages
        total = 0;

        poll.options.forEach(element => {
            total = total + parseInt(element.optionChosen);
        });

        // Add a New Property of Perc to Allow this to be Displayed
        poll.options.forEach(element => {
            element["perc"] = String(Math.round((element.optionChosen / total) * 100));
        });

        // Sort the Elements
        poll.options.sort(function(a, b) {
            return b.perc - a.perc;
        });

        // Send to the Front End
        res.json(poll.options);
    });
});

function process_results(all_results, new_result){
    // We need to get the Poll from the Id
    polls = all_results.polls;
    i = polls.findIndex(obj => obj.pollId === parseInt(new_result.pollId));

    // Get the Options Associated With the Poll
    const options = polls[i].options;
    const index = options.findIndex(obj => obj.optionId === parseInt(new_result.optionId));

    // Modify the Item and Write to a File
    options[index].optionChosen = options[index].optionChosen + 1;

    // Prepare for the Data to be Written to the File
    const jsonString = JSON.stringify(all_results, null, 2);

    // Write the Data to a File and Return an Error if not.
    fs.writeFile('results.json', jsonString, 'utf8', (err) => {
    if (err) {return err.code;} else {return 200;}
    });
}

app.listen(port, () =>{
    console.log("Server Started")
});