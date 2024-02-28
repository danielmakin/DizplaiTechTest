function submitForm(){
    // Checks Whether a RadioButton is Selected, Tells User if One is Not
    try{
        var selectedOption = document.querySelector('input[name="options"]:checked').id;
    }catch{
        alert("Please Select an Option");
        return;
    }
    var pollId = document.getElementById("pollId")
    document.getElementById("question").textContent = "Thank you for your response";
     // Prepare to send the data to the Back end as a JSON file
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

        // Stops the user pressing Submit after the option has been submitted
        var submit = document.getElementById("submit")
        submit.classList.add("hidden");
        
        // Sumbits the Keys needed to retrieve the data requested
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
                        label.textContent = option.optionText + ": " + option.perc + "%";
                    } else {
                        console.error('Radio button or label not found for option ' + (index + 1));
                    }
                // This is so that the outputted results don't appear as radiobuttons
                radioButton.checked = false;
                radioButton.disabled = true;
            })
        })
        .catch(err => {
            alert("There Has Been an Unexpected Issue: " + err.message);
        });

    });
}