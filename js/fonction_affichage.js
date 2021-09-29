afficherProduits = (objet, sectionName, numberCam, type) => {
    createCamHTML(objet, "camera", sectionName, numberCam, type);

}
//Crée un bloc cam avec les informations à l'intérieur
createCamHTML = (objet, className, sectionName, numberCam, type) => {
    let sectionCam = document.querySelector("." + sectionName);
    let divCam;
    let arrayProperty;

    //On transforme chaque élement camera en lien vers la page_produit si besoin
    //On configure la liste des infos que l'on veut afficher selon la page
    switch (type) {
        case 'accueil':
            divCam = document.createElement("a");
            divCam.setAttribute("href", "page_produit.html?" + objet._id);
            divCam.classList.add(className);
            arrayProperty = ['name', 'imageUrl', 'price'];
            break;

        case 'page_produit':
            arrayProperty = Object.getOwnPropertyNames(objet);
            divCam = document.createElement("div");
            divCam.classList.add(className);

            break;

        case 'panier':
            divCam = document.createElement("div");
            arrayProperty = ['name', 'imageUrl', 'price'];
            divCam.classList.add(className);

            createElementNumberOfProduct(divCam, objet, numberCam);
            break;

        default:
            divCam = document.createElement("div");
    }



    //Appel d'une fonction pour afficher les infos d'une camera
    for (propertyName of arrayProperty) {
        createElementCameraHTML(objet, divCam, propertyName, numberCam);
    }
    sectionCam.appendChild(divCam);
}

//La fonction qui affiche une par une les infos d'une camera
createElementCameraHTML = (objet, divCam, param, numberCam) => {


    let divElem = document.createElement("div");
    switch (param) {
        case 'imageUrl':
            afficherImage(objet, divElem, param);

            break;

        case 'price':
            afficherPrix(objet, divElem, param);

            break;

        default:
            divElem.innerText = objet[param];

    }
    divElem.classList.add("camera__" + param);
    divCam.appendChild(divElem);
}

afficherPrix = (objet, divElem, param) => {
    const prix = objet[param];
    let prixAffiche;
    if (prix == '0') {
        prixAffiche = '0';
    } else {
        const prixCalcul = parseFloat(prix) / 100;
        prixAffiche = "Prix :" + prixCalcul.toString() + " €";
        divElem.innerText = prixAffiche;
    }

}

//Fonction qui nous permet de charger l'image
afficherImage = (objet, divElem, param) => {
    let Image = document.createElement("img");
    divElem.appendChild(Image);
    const URLImageHTTP = objet[param];
    const URLImageHTTPS = "https" + URLImageHTTP.substring(4);

    fetch(URLImageHTTPS)
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
        let idProductInURL = idProduct;
        divCam.setAttribute("href", "page_produit.html?Id=" + idProduct);
    }
    )

}


//Fonction qui crée le bouton pour vider le panier
createBoutonViderPanier = () => {
    if (localStorage.getItem('panier') != null) {
        let header = document.querySelector("header");
        let viderPanier = document.createElement("div");
        viderPanier.classList.add("header__viderPanier")
        header.appendChild(viderPanier);
        viderPanier.innerText = "Vider le panier";
        viderPanier.addEventListener('click', (e) => {
            e.preventDefault;
            e.stopPropagation;
            localStorage.removeItem('panier');
            document.location.href = "page_panier.html";
        })
    }
}



//Crée une div dans le bloc camera qui affiche le nombre de cet exemplaire dans le panier
createElementNumberOfProduct = (divCam, objet, numberCam) => {

    let divElem = document.createElement("div");
    divElem.classList.add("camera__numberOfProduct");
    divCam.appendChild(divElem);
    let panier = JSON.parse(localStorage.getItem('panier'));
    if (panier == null) {
        panier = new Panier([], [], []);
    }
    let panier2 = new Panier(panier.listeId, panier.listePrice, panier.numberOfProduct);
    let indexToDisplay = panier2.listeId.indexOf(objet._id);
    divElem.innerText = "Nombre de produit : " + panier2.numberOfProduct[indexToDisplay];

}

//fonction qui remplie la section footer
createContenuFooter = () => {
    const footer = document.querySelector("footer");
    //Creation des liens
    const liensFooter = document.createElement("div");
    footer.appendChild(liensFooter);
    const listeContenuFooter = ["contact", "informations", "conditionsVente", "conditionsLivraison"];

    for (let nomElementFooter of listeContenuFooter) {
        elemFoot = document.createElement("a");
        elemFoot.classList.add("footer__" + nomElementFooter);
        elemFoot.setAttribute("href", "#");
        liensFooter.appendChild(elemFoot);

    }

    document.querySelector(".footer__contact").innerText = "Contact";
    document.querySelector(".footer__informations").innerText = "Informations utiles";
    document.querySelector(".footer__conditionsVente").innerText = "Nos conditions de vente";
    document.querySelector(".footer__conditionsLivraison").innerText = "Nos conditions de livraison";

    //Création de l'adresse
    const adresseFooter = document.createElement("div");
    footer.appendChild(adresseFooter);

    const listeAdresseFooter = ["nom", "rue", "codePostal", "ville"];
    for (let nomElementAdresse of listeAdresseFooter) {
        elemAdre = document.createElement("div");
        elemAdre.classList.add("adresse__" + nomElementAdresse);
        adresseFooter.appendChild(elemAdre);
    }
    document.querySelector(".adresse__nom").innerText = "Orinoco";
    document.querySelector(".adresse__rue").innerText = "27 rue Joseph Nicéphore Niépce";
    document.querySelector(".adresse__codePostal").innerText = "71100";
    document.querySelector(".adresse__ville").innerText = "Chalon-sur-Saône";
}

//Creation du Header
createContenuHeader = (page) => {
    const header = document.querySelector("header");
    header.classList.add("header");
    let imageDiv;
    let lienPanier;

    //Propriété du logo
    const logo = document.createElement("img");
    logo.setAttribute("src", "logo.jpg");
    logo.setAttribute("alt", "logo du site Orinoco");
    logo.setAttribute("height", "75");
    logo.setAttribute('width', '200');

    //Creation des liens
    switch (page) {
        case 'accueil':
            lienPanier = document.createElement("a");
            lienPanier.setAttribute("href", "page_panier.html");
            lienPanier.innerText = "Panier";
            lienPanier.classList.add("header__lienPanier")
            header.appendChild(lienPanier);
            imageDiv = document.createElement("div");
            imageDiv.classList.add("header__logo");
            header.appendChild(imageDiv);
            imageDiv.appendChild(logo);

            break;

        case 'page_produit':
            lienPanier = document.createElement("a");
            lienPanier.setAttribute("href", "page_panier.html");
            lienPanier.innerText = "Panier";
            lienPanier.classList.add("header__lienPanier")
            header.appendChild(lienPanier);
            imageDiv = document.createElement("a");
            imageDiv.setAttribute("href", "index.html");
            imageDiv.classList.add("header__logo");
            header.appendChild(imageDiv);
            imageDiv.appendChild(logo);
            break;

        case 'page_panier':
            imageDiv = document.createElement("a");
            imageDiv.setAttribute("href", "index.html");
            imageDiv.classList.add("header__logo");
            header.appendChild(imageDiv);
            imageDiv.appendChild(logo);
            break;

        case 'page_confirmation':
            imageDiv = document.createElement("a");
            imageDiv.setAttribute("href", "index.html");
            imageDiv.classList.add("header__logo");
            header.appendChild(imageDiv);
            imageDiv.appendChild(logo);
            break;

    }
}