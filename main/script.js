function submitForm(){
    // Get form data
    var selectedOption = document.querySelector('input[name="options"]:checked').id;
     // Convert form data to JSON object
    jsonData = {}
    jsonData['option'] = selectedOption;
    fetch("http://localhost:5000/form", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(jsonData)
        })
    alert("Data Sent")
}