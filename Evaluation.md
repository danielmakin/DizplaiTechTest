# Evaluation Document

## Overall Evaluation

Overall, the Project meets the requirements set out in the original document. All of the technical specifications were met. Also some extra were included with the inclusion of multiple polls and the ability to write the result of a poll to a file with the current selection included.

In terms of shortcomings, a feature I had hoped to implement was the visual representation of the percentage split, however, this led to too much difficulty and was simply not worth being prioritized over more pressing features. Mobile capabilities were not able to be tested, although should work in theory.

## Testing Methods

Testing featured a variety of approaches to ensure that the project would function as expected. These ranged from Corner tests to erroneous testing methods in which the system was designed to break. Also acceptable data was input to ensure that the tally increased as expected. These different conditions were set out on each of the features:
* Selecting *Exactly One* Option.
* Let an Option be Submit.
* Ensure the Tally Increases with a Successful Input
* Precentage Shown to the User is Correct
    * This Output should also be **Sorted** and with **No Decimal Places**.

For front-end testing, A/B testing was employed to ensure that the system met the requirements put forward in the images provided.

## Security Issues

The Main issue of this Software comes with the Back end System of Node. Issues arise with the input not being properly validated when passed between. In this system, in particular, there is a lot of JSON data passed between back-end and front-end systems. This data could be susceptible to a Man-In-The-Middle attack as the input is not properly validated on the server side. 

Also, Node depends on a lot of Third-Party software which is all susceptible to attacks in its own right. When a vulnerability is introduced into a third-party node dependency, this puts the entire system at risk.

The Other technologies used in this project are not inherentley insecure in themselves. The main issue comes from the server-side handling of the data. In a local system that only modifies local files and has no interactions with the outside world, these issues are not major. Although would become an issue if deployed to external users and hosted online.

This Could be Hosted on a Cloud Software with any Cloud Service such as AWS to use this. The Data itself could be hosted or there could be an entire Software as a Service (SAAS) to host the website and data.

## Proposed Pipeline of Development

This Development Process was followed fairly well with this being a rough guide. Please Refer to *Requirements.md* for the set-out list of requirements.

## Front-end Requirements (MVP)
* Voting Page
    * Test Case 1: PASS (Only One Selection can be Made at a time)
        * RadioButtons were used to Achieve this.
    * Test Case 2: PASS (The Detection Mechanism Ensures that a property of -1 is not selected).
        * Evaluating the Radio Button's SelectedIndex Property Allowed for This
* Confirmation Page
    * Test Case 1: PASS (All Results are Ordered)
        * A back end sorting Mechanism was Implemented.
    * Test Case 2: PASS (Results are Rounded)
        * This is also done on the back-end.
* Styling
    * Test Case 1: PASS 
        * When the MVP Was completed, It featured minimal styling and simple radio buttons.
        * However, since this was completed, More Styling has been introduced to fit the Pictures Provided.
* Technologies:
    *HTML, CSS, JavaScript, and Node* were used.

## Back End Development
* 3 Main Functions:
    * PASS: Get the Current Poll
        Although It does Get a Random Poll, with the specifications being unclear.
    * PASS: Allow an Option to be Submitted
        * Extensive Manual testing was Employed to ensure this.
        * A Unit Testing Software (Jest) was trialed but appeared unsuitable for the complexity of this software.
    * PASS: Get the Overall results
        * This was Completed and extensive testing was once again completed.
        * A *results.json* file was introduced to store the results
* Database Design:
    * Create: Not Implemented
        * Although, it can adapt to new entries being inputted.
    * Retrieve:
        * FAIL: Retrieving an Item that doesn't exist appears difficult to test without UNIT testing software.
        * However, there was error catching in place which should work in theory.
    * Update:
        * FAIL: Updating an Item that doesn't exist appears difficult to test without UNIT testing software.
        * However, there was error catching in place which should work in theory.
    * Delete:
        * Not Part of the MVP, but the Software can react to entries being deleted.
* Technologies:
    * Upon the Recommendation of the Specification (And my curiosity) I have learned *node* for this project, and it has been implemented well.
## Poll Specifications
* Number of Options: From 2-5 (Inclusive) **PASS**
    * Options Have:
        * *optionId* (Integer) **PASS**
        * *optionText* (String) **PASS**
* Needs a Question.
    * Questions Have:
        * *pollId* (Integer) **PASS**
        * *pollName* (String) **PASS**
        * *question* (String) **PASS**
        * *options* (options[]) **PASS**
* In this model I implemented a *results.json* also:
    * This was done to ensure that the Specified Dataframe is in the correct format.
    * While also allowing results to be stored.