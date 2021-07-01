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

        const resQuest = convert(this.reponse).slice().sort();
        const choixSorted = convert(choix).slice().sort();

        return (
            resQuest.length === choixSorted.length &&
            resQuest.every((value, index) => {
                return value === choixSorted[index];
            })
        );
    }

    showCorrectAnswer(choix) {
        const convert = (num) => {
            return typeof num !== "object" ? Array.from(String(num), Number) : num;
        };

        const resQuest = convert(this.reponse).slice().sort();
        // const choixSorted = convert(choix).slice().sort();

        // return choixSorted.map((e) => resQuest.includes(e));
        return resQuest.includes(choix);
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

    guessResult(answer) {
        return this.getCurrentQuestion().showCorrectAnswer(answer);
    }

    getExplication() {
        return this.questions[this.currentQuestionIndex - 1].explication;
    }

    hasEnded() {
        return this.currentQuestionIndex >= this.questions.length;
    }
}
