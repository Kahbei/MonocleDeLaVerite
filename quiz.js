import { questions as JSON_FILE } from "./question.js";

class Question {
    constructor(question, type, reponse, explication, proposition, image) {
        this.question = question;
        this.type = type;
        this.reponse = reponse;
        this.explication = explication;
        this.proposition = proposition;
        this.image = image;
    }

    isCorrectAnswer(choix) {
        return this.response === choix;
    }

    displayQuestion() {
        console.log("Questioin 1: " + this.question);
    }
}

class Quiz {
    constructor(questions) {
        this.score = 0;
        this.questions = questions;
        this.currentQuestionIndex = 0;
    }

    getCurrentQuestion() {
        return this.questions[this.currentQuestionIndex];
    }

    guess(answer) {
        if (this.getCurrentQuestion().isCorrectAnswer(answer)) {
            this.score++;
        }
        this.currentQuestionIndex++;
    }

    hasEnded() {
        return this.currentQuestionIndex >= this.questions.length;
    }
}

// Regroup all  functions relative to the App Display
const display = {
    elementShown: function (id, text) {
        let element = document.getElementById(id);
        element.innerHTML = text;
    },
    endQuiz: function () {
        endQuizHTML = `
        <h1>Quiz terminé !</h1>
        <h3> Votre score est de : ${quiz.score} / ${quiz.questions.length}</h3>`;
        this.elementShown("quiz", endQuizHTML);
    },
    question: function () {
        this.elementShown("question", quiz.getCurrentQuestion().text);
    },
    choices: function () {
        let choices = quiz.getCurrentQuestion().choices;

        guessHandler = (id, guess) => {
            document.getElementById(id).onclick = function () {
                quiz.guess(guess);
                quizApp();
            };
        };
        // display choices and handle guess
        for (let i = 0; i < choices.length; i++) {
            this.elementShown("choice" + i, choices[i]);
            guessHandler("guess" + i, choices[i]);
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

let test = [];

for (const it of JSON_FILE) {
    let t = new Question(
        it.question,
        it.type,
        it.reponse,
        it.explication,
        it.proposition,
        it.image
    );
    test.push(t);
}

// Create Quiz
let quiz = new Quiz(test);
quizApp();

console.log(quiz);
