function submitForm(){
    // Get form data
    var selectedOption = document.querySelector('input[name="options"]:checked').id;
    var pollId = document.getElementById("pollId")
     // Convert form data to JSON object
    jsonData = {}
    jsonData['optionId'] = selectedOption;
    jsonData['pollId'] = pollId.textContent;
    fetch("http://localhost:5000/form/results", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(jsonData)
        })
}