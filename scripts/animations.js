/**
 * fonction pour afficher la correction une fois les réponses entrées
 */
function showAnswer() {
    var reponse = document.getElementById("response");
    reponse.classList.remove("hide")
}

/**
 * affiche le bouton en vert pour signifier qu'une bonne réponse a été choisit
 * @param {id} idButton 
 */
function rightAnswer(idButton) {
    var bouton = document.getElementById(idButton);
    bouton.style.backgroundColor = "#22d442";
    showAnswer()
}

/**
 * affiche le bouton en rouge pour signifier qu'une mauvaise réponse a été choisit
 * @param {id} idButton 
 */
function wrongAnswer(idButton) {
    var bouton = document.getElementById(idButton);
    bouton.style.backgroundColor = "#910f1c";
    showAnswer()
}