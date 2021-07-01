imgOrtext(true)

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

/**
 * Si le paramètre donné est true alors on change la taille des boutons pour
 * qu'ils puissent accueillir une image.
 * Sinon on cache simplement l'image de "présentation" sous la question.
 * @param {bool} isImage 
 */
function imgOrtext(isImage) {
    if (isImage === true) {
        //redéfinir la taille des boutons pour accueillir les images
        var listBtn = document.getElementsByClassName('btn');
        for (let btn of listBtn) {
            btn.classList.add("btnImage")
        }
        //enlever l'image de "présentation"
        var imgPres = document.getElementById('imageComplotDiv');
        imgPres.style.display = "none";
        //et enlever le texte dans les boutons
        var listText = document.getElementsByClassName('preponses');
        for (let text of listText) {
            text.style.display = "none";
        }
    } else {
        //mettre les images en invisible
        var listImg = document.getElementsByClassName('ireponses');
        for (let img of listImg) {
            img.style.display = "none";
        }
    }
}