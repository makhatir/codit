
export const copyTextToClipboard = (title, article, ref) => {
    const copyInput = document.createElement("input");
    copyInput.value = title + article + ref;
    document.body.appendChild(copyInput);
    copyInput.select();
    document.execCommand("copy");
    document.body.removeChild(copyInput);
    if(article.length){
        alert("Votre article a été copié avec succès.");
    }

 
};

export const normalizeString = (str) => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s/g, '');
};
