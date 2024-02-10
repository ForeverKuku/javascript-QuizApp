// Import the readline module for interactive command line interfaces.
const readline = require('readline');

// Create the readline interface for input/output.
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Define the quiz questions and answers.
const questions = [
    { question: "What is 2 + 2?", answer: "4" },
    { question: "Name of the JavaScript engine in Google Chrome?", answer: "V8" },
    { question: "What does HTML stand for?", answer: "Hyper Text Markup Language" },
];

// Initialize the score and the current question index.
let score = 0;

// Function to ask a question and wait for the user's answer.
const askQuestion = (question) => {
    return new Promise((resolve) => {
        rl.question(`${question.question}\nYour answer: `, (input) => {
            if (input.trim().toLowerCase() === question.answer.toLowerCase()) {
                score++;
                console.log("Correct!\n");
            } else {
                console.log(`Wrong! The correct answer is: ${question.answer}\n`);
            }
            resolve();
        });
    });
};

// The main function to start the quiz.
const startQuiz = async () => {
    console.log("Welcome to the Quiz!\n");

    // Loop through each question.
    for (const question of questions) {
        await askQuestion(question);
    }

    // Display the final score and close the interface.
    console.log(`Quiz completed! Your score: ${score}/${questions.length}`);
    rl.close();
};

// Kick off the quiz.
startQuiz();
