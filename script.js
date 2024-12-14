const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
let shuffledQuestions, currentQuestionIndex;
let quizScore = 0;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});

function startGame() {
    startButton.classList.add('hide');
    shuffledQuestions = shuffleArray(questions);
    currentQuestionIndex = 0;
    quizScore = 0;
    updateScore();
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach((answer) => {
        const button = createAnswerButton(answer);
        answerButtonsElement.appendChild(button);
    });
}

function createAnswerButton(answer) {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    if (answer.correct) {
        button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    return button;
}

function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    answerButtonsElement.innerHTML = ''; // Clear existing answer buttons
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === "true";

    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach((button) => {
        setStatusClass(button, button.dataset.correct === "true");
    });

    if (correct) {
        quizScore++;
    }

    updateScore();

    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        showQuizCompletion();
    }
}

function showQuizCompletion() {
    resetState();
    questionElement.innerHTML = `
        <h2>Quiz Completed!</h2>
        <p>Your score is ${quizScore}/${questions.length}</p>
        <p>Great job! Press "Restart" to try again.</p>
    `;
    startButton.innerText = "Restart";
    startButton.classList.remove('hide');
    nextButton.classList.add('hide');
}

function resetQuiz() {
    resetState();
    questionContainerElement.classList.add('hide');
    questionElement.innerText = "";
    startButton.innerText = "Start";
    quizScore = 0;
    updateScore();
}

function updateScore() {
    document.getElementById('right-answers').innerText = quizScore;
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    element.classList.add(correct ? 'correct' : 'wrong');
}

function clearStatusClass(element) {
    element.classList.remove('correct', 'wrong');
}

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

const questions = [
    {
        question: 'Which one of these is a JavaScript framework?',
        answers: [
            { text: 'Python', correct: false },
            { text: 'Django', correct: false },
            { text: 'React', correct: true },
            { text: 'Eclipse', correct: false },
        ],
    },
    {
        question: 'What does HTML stand for?',
        answers: [
            { text: 'Hyper Trainer Marking Language', correct: false },
            { text: 'Hyper Text Markup Language', correct: true },
            { text: 'Hyper Text Making Language', correct: false },
            { text: 'Hyper Tool Markup Language', correct: false },
        ],
    },
    {
        question: 'What does CSS stand for?',
        answers: [
            { text: 'Cascading Style Sheets', correct: true },
            { text: 'Computer Style Sheets', correct: false },
            { text: 'Creative Style System', correct: false },
            { text: 'Colorful Style Sheets', correct: false },
        ],
    },
    {
        question: 'Which HTML tag is used to link an external CSS file?',
        answers: [
            { text: '<style>', correct: false },
            { text: '<link>', correct: true },
            { text: '<script>', correct: false },
            { text: '<css>', correct: false },
        ],
    },
    {
        question: 'What does the "DOM" stand for in web development?',
        answers: [
            { text: 'Document Object Model', correct: true },
            { text: 'Data Object Management', correct: false },
            { text: 'Document Oriented Markup', correct: false },
            { text: 'Dynamic Output Management', correct: false },
        ],
    },
    {
        question: 'Which of the following is a version control system?',
        answers: [
            { text: 'Git', correct: true },
            { text: 'Node.js', correct: false },
            { text: 'Bootstrap', correct: false },
            { text: 'JQuery', correct: false },
        ],
    },
    
    {
        question: 'Which programming language is used to style web pages?',
        answers: [
            { text: 'Java', correct: false },
            { text: 'CSS', correct: true },
            { text: 'C++', correct: false },
            { text: 'PHP', correct: false },
        ],
    },
    {
        question: 'What is the main purpose of JavaScript?',
        answers: [
            { text: 'To structure web pages', correct: false },
            { text: 'To style web pages', correct: false },
            { text: 'To add interactivity to web pages', correct: true },
            { text: 'To store data on the server', correct: false },
        ],
    },
    {
        question: 'Which of the following is a CSS framework?',
        answers: [
            { text: 'React', correct: false },
            { text: 'Express', correct: false },
            { text: 'Bootstrap', correct: true },
            { text: 'Laravel', correct: false },
        ],
    },
];

