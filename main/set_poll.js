function update_radio_buttons(){
    // The Function of this Routine is to allow the Radiobuttons to be given the value from the JSON file
    fetch('api/question')
    .then(response => response.json())
    .then(data => {

        // Set the Title Question
        const title = document.getElementById("question");
        title.textContent = data.question;

        const id = document.getElementById("pollId");
        id.textContent = data.pollId;

        // Loop through each object in data
        options = data.options;
        // Loop through each of the possible options
        options.forEach((option, index) => {
            // get the radio button and the associated label
            const radioButton = document.getElementById((index + 1).toString());
                const label = document.querySelector('label[for="' + (index + 1) + '"]');
                // Check that they exist and set them
                if (radioButton && label) {
                    radioButton.value = option.optionText;
                    label.textContent = option.optionText;
                } else {
                    console.error('Radio button or label not found for option ' + (index + 1));
                }
        });

        // Removes any extra buttons if they are not used in the options
        for (let i=options.length + 1; i<=5; i++){
            document.getElementById(i).remove();
            document.querySelector('label[for="' + (i) + '"]').style.display = "none";
        }

    })
    // Error Catching
    .catch(error => console.error("Error Fetching Data: ". error));
}

// Allows this Function to be Activated
window.addEventListener('DOMContentLoaded', (event) => {
    update_radio_buttons();
});