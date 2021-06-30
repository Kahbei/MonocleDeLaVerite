import { questions as JSON_FILE } from "./question.js";
import { Question, Quiz } from "./Quiz.class.js";

// Regroup all  functions relative to the App Display
const display = {
    elementShown: function (id, text) {
        let element = document.getElementById(id);
        element.innerHTML = text;
    },

    endQuiz: function () {
        const endQuizHTML = `
        <h1>Quiz terminé !</h1>
        <h3> Votre score est de : ${quiz.score} / ${quiz.questions.length}</h3>`;
        this.elementShown("quiz", endQuizHTML);
    },

    answer: function () {
        this.elementShown("question", quiz.getCurrentQuestion().reponse);
    },

    question: function () {
        this.elementShown("question", quiz.getCurrentQuestion().question);
    },

    choices: function () {
        let choices = quiz.getCurrentQuestion().proposition;
        let type = quiz.getCurrentQuestion().type;
        let te = [];

        const guessHandler = (id, guess) => {
            if (type === "boolean") {
                document.getElementById(id).onclick = function () {
                    quiz.guess(guess);
                    quizApp();
                };
            } else if (type === "multiple") {
                let resLength = quiz.getCurrentQuestion().reponse.length;

                document.getElementById(id).onclick = function () {
                    te.push(guess);

                    if (te.length === resLength) {
                        quiz.guess(te);
                        quizApp();
                    }
                };
            }
        };

        // Display the choices
        let buildChoices = "";
        for (let i = 0; i < choices.length; i++) {
            buildChoices += `
                <button id="guess${i}" class="btn btn-outline-dark btn-lg btnReponse w-25">
                    <p id="choice${i}" class="mt-0 mb-0">${choices[i].text}</p>
                </button>
            `;
        }

        this.elementShown("choices", buildChoices);

        // Handle the guess
        for (let i = 0; i < choices.length; i++) {
            guessHandler("guess" + i, choices[i].id);
        }
    },

    progress: function () {
        let currentQuestionNumber = quiz.currentQuestionIndex + 1;
        this.elementShown(
            "progress",
            "Question " + currentQuestionNumber + " sur " + quiz.questions.length
        );
    },
};

// Game logic
const quizApp = () => {
    if (quiz.hasEnded()) {
        display.endQuiz();
    } else {
        display.question();
        display.choices();
        display.progress();
    }
};

let arrObj = [];

for (const it of JSON_FILE) {
    let t = new Question(
        it.question,
        it.type,
        it.reponse,
        it.explication,
        it.proposition,
        it.image
    );
    arrObj.push(t);
}

// Create Quiz
let quiz = new Quiz(arrObj);
quizApp();
