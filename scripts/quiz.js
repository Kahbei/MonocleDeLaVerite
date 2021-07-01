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

    explication: function () {
        const explication = `
            <div class="explication">
                <p>${quiz.getExplication()}</p>
                <button id="next" class="btn btn-light btn-outline-dark">Suivant</button>
            </div>
        `;
        this.elementShown("explication", explication);
    },

    question: function () {
        this.elementShown("question", quiz.getCurrentQuestion().question);
    },

    choices: function () {
        let choices = quiz.getCurrentQuestion().proposition;
        let type = quiz.getCurrentQuestion().type;
        let multipleReponse = [];

        const guessHandler = (id, guess) => {
            if (type === "boolean") {
                document.getElementById(id).onclick = function () {
                    let guessAnswer = quiz.guessResult(guess);

                    if (guessAnswer) {
                        document.getElementById(id).style.backgroundColor = "#22d442";
                    } else {
                        document.getElementById(id).style.backgroundColor = "#910f1c";
                    }

                    quiz.guess(guess);
                    document.querySelectorAll("button").forEach((e) => (e.disabled = true));
                    quizApp(true);
                };
            } else if (type === "multiple") {
                let resLength = quiz.getCurrentQuestion().reponse.length;

                document.getElementById(id).onclick = function () {
                    let guessAnswer = quiz.guessResult(guess);

                    if (guessAnswer) {
                        document.getElementById(id).style.backgroundColor = "#22d442";
                    } else {
                        document.getElementById(id).style.backgroundColor = "#910f1c";
                    }

                    multipleReponse.push(guess);
                    document.getElementById(id).disabled = true;

                    if (multipleReponse.length === resLength) {
                        quiz.guess(multipleReponse);
                        document.querySelectorAll("button").forEach((e) => (e.disabled = true));
                        quizApp(true);
                    }
                };
            }
        };

        // Display the choices
        let buildChoices = "";
        for (let i = 0; i < choices.length; i++) {
            if (type === "image") {
                buildChoices += `
                    <button id="guess${i}" class="btn btn-dark btn-lg btnReponse w-25">
                        <img class="ireponses imageComplot" src="${choices[i].image}" alt="choix${i}">
                    </button>
                `;
            } else {
                buildChoices += `
                    <button id="guess${i}" class="btn btn-dark btn-lg btnReponse w-25">
                        <p id="choice${i}" class="mt-0 mb-0 presponses">${choices[i].text}</p>
                    </button>
                `;
            }
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
const quizApp = (t) => {
    if (!t) {
        if (quiz.hasEnded()) {
            display.endQuiz();
        } else {
            display.question();
            display.choices();
            display.progress();
        }
    } else {
        if (quiz.hasEnded()) {
            display.explication();
            document.getElementById("next").onclick = () => {
                document.querySelector(".explication").style.display = "none";
                display.endQuiz();
            };
        } else {
            display.explication();

            document.getElementById("next").onclick = () => {
                document.querySelector(".explication").style.display = "none";
                display.question();
                display.choices();
                display.progress();
            };
        }
    }
};

let arrObj = [];

for (const it of JSON_FILE) {
    let questionObject = new Question(
        it.question,
        it.type,
        it.reponse,
        it.explication,
        it.proposition,
        it.image
    );
    arrObj.push(questionObject);
}

// Create Quiz
let quiz = new Quiz(arrObj);
quizApp();
