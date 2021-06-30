imgOrtext(false)


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

function imgOrtext(isImage) {
    if (isImage === true) {
        var listImg = document.getElementsByClassName('btnReponse');
        console.log(listImg);
        for (let img of listImg) {
            img.classList.remove("btnReponse")
            img.classList.add("btnReponse.image")
        }
    }
}