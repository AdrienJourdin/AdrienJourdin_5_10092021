afficherProduits = (objet, sectionName, numberCam, type) => {
    createCamHTML(objet, "camera", sectionName, numberCam, type);
}
console.log(JSON.stringify({ product: [1, 2, 3] }));
//Crée un bloc cam avec un lien vers la page voulue
createCamHTML = (objet, className, sectionName, numberCam, type) => {
    let sectionCam = document.querySelector("." + sectionName);
    let divCam;
    switch (type) {
        case 'accueil':
            divCam = document.createElement("a");
            divCam.setAttribute("href", "page_produit.html");
            CreateLinkProduct(objet._id, divCam);

            break;

        case 'page_produit':
            divCam = document.createElement("div");

            break;

        case 'panier':
            divCam = document.createElement("div");
            //divCam.setAttribute("href", "page_produit.html");
            //CreateLinkProduct(objet._id, divCam);

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

    if (type = 'panier') {
        createBoutonAjoutPanier(className, objet, numberCam);
        createBoutonRetraitPanier(className, objet, numberCam);
        createElementNumberOfProduct(className, objet, numberCam);
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

createBoutonAjoutPanier = (className, objet, numberCam) => {

    let camchoosen = document.querySelector("." + className + ":nth-child(" + numberCam + ")");
    let ajoutPanier = document.createElement('div');
    ajoutPanier.classList.add(className + "__Ajout_Panier");
    ajoutPanier.innerText = "Ajouter un exemplaire au panier";
    camchoosen.appendChild(ajoutPanier);
    let listProducts;
    if (localStorage.getItem('listProducts') == null) {
        listProducts = [];
    } else {
        listProducts = JSON.parse(localStorage.getItem('listProducts'));
    }
    listProducts.push(objet);
    localStorage.setItem('listProducts', JSON.stringify(listProducts));
    ajoutPanier.addEventListener('click', (e) => {
        e.preventDefault;
        e.stopPropagation;
        let panier = JSON.parse(localStorage.getItem('panier'));
        if (panier == null) {
            panier = new Panier([], [], []);
        }
        let panier2 = new Panier(panier.listeId, panier.listePrice, panier.numberOfProduct);
        panier2.addToCart(listProducts[numberCam - 1]);
        localStorage.setItem('panier', JSON.stringify(panier2));
    }
    )
}

createBoutonRetraitPanier = (className, objet, numberCam) => {
    let camchoosen = document.querySelector("." + className + ":nth-child(" + numberCam + ")");
    let ajoutPanier = document.createElement('div');
    ajoutPanier.classList.add(className + "__RetraitPanier");
    ajoutPanier.innerText = "Retirer un exemplaire au panier";
    camchoosen.appendChild(ajoutPanier);
    listProducts = JSON.parse(localStorage.getItem('listProducts'));
    ajoutPanier.addEventListener('click', (e) => {
        e.preventDefault;
        e.stopPropagation;
        let panier = JSON.parse(localStorage.getItem('panier'));
        if (panier == null) {
            panier = new Panier([], [], []);
        }
        let panier2 = new Panier(panier.listeId, panier.listePrice, panier.numberOfProduct);
        panier2.RemoveToCart(listProducts[numberCam - 1]);
        localStorage.setItem('panier', JSON.stringify(panier2));
    }
    )
}

createBoutonViderPanier = () => {
    let header = document.querySelector("header");
    let viderPanier = document.createElement("div");
    header.appendChild(viderPanier);
    viderPanier.innerText="Vider le panier";
    viderPanier.addEventListener('click', (e) => {
        e.preventDefault;
        e.stopPropagation;
        localStorage.removeItem('panier');
    })
}

//Crée une div dans le bloc camera qui affiche le nombre de cet exemplaire dans le panier
createElementNumberOfProduct = (className, objet, numberCam) => {
    console.log("." + className + ":nth-child(" + numberCam + ")");
    let divCam = document.querySelector("." + className + ":nth-child(" + numberCam + ")");
    let divElem = document.createElement("div");
    divElem.classList.add(className + "__numberOfProduct");
    divCam.appendChild(divElem);
    let panier = JSON.parse(localStorage.getItem('panier'));
    if (panier == null) {
        panier = new Panier([], [], []);
    }
    let panier2 = new Panier(panier.listeId, panier.listePrice, panier.numberOfProduct);
    let indexToDisplay = panier2.listeId.indexOf(objet._id);
    divElem.innerText = "Nombre de produit : " + panier2.numberOfProduct[indexToDisplay];

}
