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
});

// Route to render the HTML form
app.get('/form', (req, res) => {
    res.sendFile(__dirname + '/main/index.html');
});

app.get('/api/question', (req, res)=> {
    polls = jdata.polls;
    poll = polls[polls.findIndex(obj => obj.pollId === 1)];
    res.json(poll);
});

app.post('/form/results', (req, res) =>{

    const new_result = req.body;

    let all_results;

    fs.readFile("results.json", 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }
        all_results = JSON.parse(data);
        process_results(all_results, new_result);

        res.status(200).json({ ok: true });
    });
});

app.get('/api/results', (req, res) => {

    const optionId = req.query.optionId;
    const pollId = req.query.pollId;

    // Do something with the received data

    let all_results;
    fs.readFile("results.json", 'utf8', (err, data) => {
        let jdata;
        if (err) {
            console.error('Error reading file:', err);
            return;
        }
        try {
            jdata = JSON.parse(data);
            console.log(data);
          } catch (error) {
            console.error('Error parsing JSON:', error.message);
          }

        poll = jdata.polls[jdata.polls.findIndex(obj => obj.pollId === parseInt(pollId))];
        


        // Now Calculate the Percentages
        total = 0;

        poll.options.forEach(element => {
            total = total + parseInt(element.optionChosen);
        });

        poll.options.forEach(element => {
            element.optionChosen = Math.round((element.optionChosen / total) * 100)
        });

        res.json(poll.options);
    });
});

function process_results(all_results, new_result){
    // Passes in the JSON data from the results file and the form.
    // We need to get the Poll from the Id
    polls = all_results.polls;
    i = polls.findIndex(obj => obj.pollId === parseInt(new_result.pollId));

    const options = polls[i].options;
    const index = options.findIndex(obj => obj.optionId === parseInt(new_result.optionId));

    // Modify the Item and Write to a File
    options[index].optionChosen = options[index].optionChosen + 1;
    console.log(all_results);

    const jsonString = JSON.stringify(all_results, null, 2); // Convert JSON object to string with indentation

    fs.writeFile('results.json', jsonString, 'utf8', (err) => {
    if (err) {return err.code;} else {return 200;}
    });
}

app.listen(port, () =>{
    console.log("Server Started")
});