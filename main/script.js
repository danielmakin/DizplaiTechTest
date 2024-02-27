function submitForm(){
    // Get form data
    var selectedOption = document.querySelector('input[name="options"]:checked').id;
    var pollId = document.getElementById("pollId")
    document.getElementById("question").textContent = "Thank you for your response";
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
    .then(res => {
        if (res.ok){
            console.log("File Saved");
        }else{
            console.log("File Not Saved");
        }

        var submit = document.getElementById("submit")
        submit.classList.add("hidden");

        const queryString = Object.entries(jsonData)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');

        fetch("http://localhost:5000/api/results?" + queryString)
        .then(res => res.json())
        .then(data => {
            // Now Change The labels
            data.forEach((option, index) => {
                // get the radio button and the associated label
                const radioButton = document.getElementById((index + 1).toString());
                    const label = document.querySelector('label[for="' + (index + 1) + '"]');
                    // Check that they exist and set them
                    if (radioButton && label) {
                        radioButton.value = option.optionText;
                        label.textContent = label.textContent + ": " + option.optionChosen + "%";
                    } else {
                        console.error('Radio button or label not found for option ' + (index + 1));
                    }
                radioButton.checked = false;
                radioButton.disabled = true;
            });
        });

    });


    // Now get the results
    // Construct the query string
}