export class Question {
    constructor(question, type, reponse, explication, proposition, image) {
        this.question = question;
        this.type = type;
        this.reponse = reponse;
        this.explication = explication;
        this.proposition = proposition;
        this.image = image;
    }

    isCorrectAnswer(choix) {
        const convert = (num) => {
            return typeof num !== "object" ? Array.from(String(num), Number) : num;
        };

        choix = convert(choix);
        const resQuest = convert(this.reponse);
        const choixSorted = choix.slice().sort();

        return (
            resQuest.length === choix.length &&
            resQuest
                .slice()
                .sort()
                .every(function (value, index) {
                    return value === choixSorted[index];
                })
        );
    }
}

export class Quiz {
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

    displayAnswer() {
        return this.questions[this.currentQuestionIndex].reponse;
    }

    hasEnded() {
        return this.currentQuestionIndex >= this.questions.length;
    }
}
