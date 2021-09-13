chargerPanier = () => {
    let = numberCam = 0;
    let panierRecup = JSON.parse(localStorage.getItem('panier'));
    if (panierRecup == null) {
        panier = new Panier([], [], [])
    }
    else {
        panier = new Panier(panierRecup.listeId, panierRecup.listePrice, panierRecup.numberOfProduct);
    }
    for (let idCam of panier.listeId) {
        console.log("numberCam",numberCam);
        
        console.log("http://localhost:3000/api/cameras/" + idCam.toString());
        fetch("http://localhost:3000/api/cameras/" + idCam.toString())
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
            })
            .then((value) => {
                const cam = value;
                console.log("numberCam",numberCam);
                numberCam++;
                let objetCam = new Camera(cam.lenses, cam._id, cam.name, cam.price, cam.description, cam.imageUrl);
                createCamHTML(objetCam, "camera", "panier", numberCam);

            })
            .catch((err) => {
                alert(err);
            })
            .finally(() => {
            }

            );
            
    }
}

createCamHTML = (objet, className, sectionName, numberCam) => {
    console.log("Create Cam numberCam",numberCam);
    let sectionCam = document.querySelector("." + sectionName);
    let divCam = document.createElement("a");
    sectionCam.appendChild(divCam);
    divCam.setAttribute("href", "page_produit.html");
    CreateLinkProduct(objet._id, divCam);
    divCam.classList.add(className);

    let arrayProperty = Object.getOwnPropertyNames(objet);
    for (propertyName of arrayProperty) {
        createElementCameraHTML(objet, className, propertyName,numberCam);
    }
    createElementNumberOfProduct(className , panier, objet,numberCam);
}

//Fonction pour créer un élément d'un bloc, cette fonction sera ensuite contenue dans la fonction createCameraHTML(qui elle crée le bloc camera)
createElementCameraHTML = (objet, className, param,numberCam) => {
    let divCam = document.querySelector("." + className+ ":nth-child(" + numberCam + ")");
    let divElem = document.createElement("div");
    divElem.classList.add(className + "__" + param);
    divCam.appendChild(divElem);
    if (param != "imageUrl") {
        divElem.innerText = objet[param];
    }
    else {
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

}

createElementNumberOfProduct = (className, panier, objet,numberCam) => {
    let divCam = document.querySelector("." + className+ ":nth-child(" + numberCam + ")");
    let divElem = document.createElement("div");
    divElem.classList.add(className + "__numberOfProduct");
    divCam.appendChild(divElem);
    let indexToDisplay = panier.listeId.indexOf(objet._id);
    divElem.innerText = "Nombre de produit : " + panier.numberOfProduct[indexToDisplay];

}

CreateLinkProduct = (idProduct, element) => {
    element.addEventListener('click', () => {
        localStorage.removeItem('idProduct');
        localStorage.setItem('idProduct', idProduct);

    }
    )
}

chargerPanier();