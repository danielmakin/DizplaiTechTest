function update_radio_buttons(){

    
    fetch('api/question')
    .then(response => response.json())
    .then(data => {

        console.log(data);

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

    })
    .catch(error => console.error("Error Fetching Data: ". error));
}

window.addEventListener('DOMContentLoaded', (event) => {
    update_radio_buttons();
});

// JavaScript code to set existing labels dynamically