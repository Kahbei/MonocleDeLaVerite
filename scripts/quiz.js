import { questions as JSON_FILE } from "./questions.js";
import { Question, Quiz } from "./Quiz.class.js";

// Regroup all  functions relative to the App Display
const display = {
    elementShown: function (id, text) {
        let element = document.getElementById(id);
        element.innerHTML = text;
    },

    endQuiz: function () {
        const bareme = [
            "Tu n'a pas d'esprit critique, pense à le travailler et ne va pas sur facebook sinon tu deviendras l'aigle.",
            "Tu as les prémices de l'esprit critique , mais tu as encore beaucoup de travail devant toi jeune padawan.",
            "Tu t'ouvres peu à peu au monde avec jugeote. Continue comme ça !",
            "Tu as un bon esprit critique de base mais tu es encore loin du compte.",
            "Tu as un très bon esprit critique, n'arrête jamais de réfléchir.",
            "Comment peut-on être aussi omniscient ? Si tous le monde était comme toi, le monde serait bien plus calme et agréable à y vivre. Il n'y aurait plus de fausse informations car plus personne pour y croire !",
        ];
        const endQuizHTML = `
            <div class="resultat">
                <h1>Quiz terminé !</h1>
                <h3> Votre score est de : ${quiz.score} / ${quiz.maxQuestion}</h3>
                <p>${bareme[quiz.score]}</p>
            </div>
        `;
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

    image: function () {
        const ifImage = quiz.getCurrentQuestion().image
            ? `src="${quiz.getCurrentQuestion().image}" alt="Illustration de la question" `
            : "src=''";
        const displayImage = `
            <img id="imagePres" class="imageComplot" ${ifImage}>
        `;
        this.elementShown("imageComplotDiv", displayImage);
    },

    question: function () {
        quiz.pickRandom();
        this.elementShown("question", quiz.getCurrentQuestion().question);
        this.image();
    },

    choices: function () {
        let choices = quiz.getCurrentQuestion().proposition;
        let type = quiz.getCurrentQuestion().type;
        let multipleReponse = [];

        const guessHandler = (id, guess) => {
            if (type === "unique") {
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
            } else if (type === "multiple" || type === "images") {
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
            if (type === "images") {
                buildChoices += `
                    <button id="guess${i}" class="btn btn-dark btn-lg btnReponse w-25">
                        <img class="ireponses imageComplot" src="${choices[i].text}" alt="choix${i}">
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
        let currentQuestionNumber = quiz.listUsedQuestion.length;
        this.elementShown(
            "progress",
            "Question " + currentQuestionNumber + " sur " + quiz.maxQuestion
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
