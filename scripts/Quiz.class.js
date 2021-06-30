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
        return this.reponse === choix;
    }

    displayQuestion() {
        console.log("Questioin 1: " + this.question);
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

        // setTimeout(() => {
        // }, 20);
        this.currentQuestionIndex++;
    }

    hasEnded() {
        return this.currentQuestionIndex >= this.questions.length;
    }
}
