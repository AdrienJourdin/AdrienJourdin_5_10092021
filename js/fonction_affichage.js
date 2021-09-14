afficherProduits = (objet, sectionName, numberCam, type) => {
    createCamHTML(objet, "camera", sectionName, numberCam, type);
}

//Crée un bloc cam avec un lien vers la page voulue
createCamHTML = (objet, className, sectionName, numberCam, type) => {
    let sectionCam = document.querySelector("." + sectionName);
    let divcam;
    switch(type){
        case 'accueil':
        divCam = document.createElement("a");
        divCam.setAttribute("href", "page_produit.html");
        CreateLinkProduct(objet._id, divCam);
        break;

        case 'page_produit':
        divCam = document.createElement("div");
        break;

        case 'panier':
        divCam = document.createElement("a");
        divCam.setAttribute("href", "page_produit.html");
        CreateLinkProduct(objet._id, divCam);
        break;

        default:
        divCam = document.createElement("div");
    }


    divCam.classList.add(className);
    sectionCam.appendChild(divCam);

    let arrayProperty = Object.getOwnPropertyNames(objet);
    for (propertyName of arrayProperty) {
        createElementCameraHTML(objet, className, propertyName, numberCam);
    }

}

createElementCameraHTML = (objet, className, param, numberCam) => {
    let divCam = document.querySelector("." + className + ":nth-child(" + numberCam + ")");
    let divElem = document.createElement("div");
    divElem.classList.add(className + "__" + param);
    divCam.appendChild(divElem);
    switch (param) {
        case 'imageUrl':
            afficherImage(objet, divElem, param);

            break;


        default:
            divElem.innerText = objet[param];

    }

}

afficherImage = (objet, divElem, param) => {
    let Image = document.createElement("img");
    divElem.appendChild(Image);
    fetch(objet[param])
        .then((res) => {
            if (res.ok) {
                return res.blob();
            }
        }).then((value) => {
            const imageUrl = URL.createObjectURL(value);
            Image.setAttribute("width", "270");
            Image.setAttribute("height", "270");
            Image.src = imageUrl;
        })
}

//Fonction qui remplace dans le localstorage l'idProduct par l'id du produit sur lequel on a cliqué
CreateLinkProduct = (idProduct, element) => {
    element.addEventListener('click', () => {
        localStorage.removeItem('idProduct');
        localStorage.setItem('idProduct', idProduct);

    }
    )
}