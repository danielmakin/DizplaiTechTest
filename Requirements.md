# Requirements Document

## Proposed Pipeline of Development
1. Font end Development
    * This is First as this is the Easiest way to test the system as a whole.
    * Although this may not be the finished product, just enough for testing.
2. Back end Development
    * This can be tested quicker with a front end system.
    * *JavaScript* will also be used to connect front and back end.

## Front-end Requirements (MVP)
* Consists of 2 Front End Pages:
    * Voting Page
        * Display the Poll to the User
        * Let the User Select an Option and Submit.
        * **Test Cases**:
            * Select One Option at a Time
            * A Selection **Must** be Made to Submit
    * Confirmation Page
        * Thank You Message to the User
        * Display the Output of the poll (currently)
        * Test Cases:
            * Ensure Results are Ordered
            * **No** Decimal Places
* Styling:
    * The **MVP** Will Feature Styling
* Technologies:
    * *HTML, CSS, JavaScript*

## Back-End Development
* Consist of 3 Main Functions:
    * Get The Current Poll
    * Allow an Option to be Submitted
    * Get the Overall results
* Database Design:
    * Create: (Not Part of the MVP)
    * Retrieve: Retrieve The Poll, Retrieve the Result (By ID)
        * **Test Case**: Retrieve an Item that Doesn't Exist
    * Update: Add the User's Current Selection to the Poll (Stored Locally)
        * **Test Case**: Update an Item That Doesn't Exist
    * Delete: (Not Part of the MVP)
* Technologies
    * *Node.js*

## Poll Specifications
* Number of Options: From 2-5 (Inclusive)
    * Options Have:
        * *optionId* (Integer)
        * *optionText* (String)
* Needs a Question.
    * Questions Have:
        * *pollId* (Integer)
        * *pollName* (String)
        * *question* (String)
        * *options* (options[])

## Choice of Technologies
* Node.js and JavaScript have been used to support *Non-Blocking* Assignments and recieve fast poll results.
* HTML, CSS Have been Used as the Syling Does not need to be Perfect, the main goal is functionality.
*(Note: This is Subject to Change as Development Progresses)*