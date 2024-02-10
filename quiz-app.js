// Import necessary modules
const fs = require('fs');
const readline = require('readline');

// Setup readline interface for user input and output in the console
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

/**
 * Reads and parses the questions from the JSON file.
 * @return {Array} List of question objects.
 */
const loadQuestions = () => {
    const jsonData = fs.readFileSync('questions.json');

    return JSON.parse(jsonData);
};

/**
 * Prompts the user for an answer to a question.
 * @param {Object} questionObj
 * @return {Promise<number>} 
*/
 
const askQuestion = (questionObj) => {
    return new Promise(resolve => {
        // Display the question and its choices
        console.log(`\n${questionObj.question}`);
        questionObj.choices.forEach((choice, index) => {
            console.log(`${index + 1}. ${choice}`);
        });

        // Prompt the user for their answer
        rl.question('Your answer (number): ', (input) => {
            
            const userChoice = questionObj.choices[parseInt(input) - 1];
            
            if (userChoice === questionObj.answer) {
                console.log('Correct!');
                resolve(1); 
            } else {
                console.log(`Incorrect! The correct answer is: ${questionObj.answer}`);
                resolve(0); 
            }
        });
    });
};

/**
 * The main function that runs the quiz.
 */
const runQuiz = async () => {
    // Load the questions
    const questions = loadQuestions();
    let score = 0;

    // Loop through each question and wait for the user to answer
    for (const question of questions) {
        score += await askQuestion(question);
    }

    // Once all questions have been answered, display the final score
    console.log(`\nQuiz completed! Your final score is: ${score}/${questions.length}`);
    rl.close();
};

// Start the quiz
runQuiz();