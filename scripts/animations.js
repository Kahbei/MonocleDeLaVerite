imgOrtext(true);

/**
 * Si le paramètre donné est true alors on change la taille des boutons pour
 * qu'ils puissent accueillir une image.
 * Sinon on cache simplement l'image de "présentation" sous la question.
 * @param {bool} isImage
 */
function imgOrtext(isImage) {
    if (isImage === true) {
        //redéfinir la taille des boutons pour accueillir les images
        var listBtn = document.getElementsByClassName("btn");
        for (let btn of listBtn) {
            btn.classList.add("btnImage");
        }
        //et enlever le texte dans les boutons
        var listText = document.getElementsByClassName("preponses");
        for (let text of listText) {
            text.style.display = "none";
        }
    } else {
        //mettre les images en invisible
        var listImg = document.getElementsByClassName("ireponses");
        for (let img of listImg) {
            img.style.display = "none";
        }
    }
}
