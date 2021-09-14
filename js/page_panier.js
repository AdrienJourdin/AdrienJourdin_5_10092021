//affichage du panier
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
        fetch("http://localhost:3000/api/cameras/" + idCam.toString())
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
            })
            .then((value) => {
                const cam = value;
                numberCam++;
                let objetCam = new Camera(cam.lenses, cam._id, cam.name, cam.price, cam.description, cam.imageUrl);
                afficherProduits(objetCam, "liste_produits", numberCam, 'panier');

            })
            .catch((err) => {
                alert(err);
            })
            .finally(() => {
            }

            );

    }
}


//Ajoute le nombre de produit pour chaque Id différent
createElementNumberOfProduct = (className, panier, objet, numberCam) => {
    let divCam = document.querySelector("." + className + ":nth-child(" + numberCam + ")");
    let divElem = document.createElement("div");
    divElem.classList.add(className + "__numberOfProduct");
    divCam.appendChild(divElem);
    let indexToDisplay = panier.listeId.indexOf(objet._id);
    divElem.innerText = "Nombre de produit : " + panier.numberOfProduct[indexToDisplay];

}

//fonction qui crée la liste des input du formulaire
createFormulaire = () => {
    let listeForm = ['firstName', 'lastName', 'adress', 'city', 'email'];

    let formulaire = document.createElement("form");
    let sectionForm = document.querySelector(".formulaire");
    sectionForm.appendChild(formulaire);
    for (let info of listeForm) {
        let inputInfo = document.createElement("input");
        formulaire.appendChild(inputInfo);
        inputInfo.setAttribute("type", "text");
        inputInfo.classList.add("formulaire__" + info);
        if (info == 'email') {
            inputInfo.setAttribute("type", "email");
        } else {
            inputInfo.setAttribute("type", "text");
        }
        inputInfo.setAttribute("id", info);
        inputInfo.setAttribute("name", "user_" + info);
        let label = document.createElement("label");
        label.innerText = " : " + info;
        label.setAttribute("for", info);
        formulaire.appendChild(label);
    }

}
//fonction qui crée le bouton pour envoyer le formulaire
createBoutonEnvoi = () => {
    let sectionForm = document.querySelector(".formulaire");
    let boutonForm = document.createElement("a");
    sectionForm.appendChild(boutonForm);
    boutonForm.classList.add("bouton_form");
    boutonForm.innerText = "Envoyer la commande";
    //boutonForm.setAttribute("href", "page_confirmation.html");
    boutonForm.addEventListener('click', () => {
        createEnvoiForm(createContactObject("formulaire"), createListeProduct());
/*         if (verificationInformations()) {

            createEnvoiForm(createContactObject("formulaire"), createListeProduct());
        }
        else {
            alert("informations incorrectes");
        }*/
    } 
    )
}

//fonction qui va venir vérifier les informations avant d'envoyer le formulaire
verificationInformations = () => {

}

//fonction qui vient créer un objet contact avec les informations rentrées dans le formulaire
//la fonction retourne un objet contact créé à partir des infos du formulaire
createContactObject = (NameForm) => {
    let listeForm = ['firstName', 'lastName', 'adress', 'city', 'email'];
    let listeValue = [];
    for (let info of listeForm) {
        listeValue.push(document.querySelector("." + NameForm + "__" + info).value);
    }
    let contactEnvoye = new Contact(listeValue[0], listeValue[1], listeValue[2], listeValue[3], listeValue[4]);
    return contactEnvoye;
}
//Creation de la liste de produits contenus dans le panier
createListeProduct = () => {
    let panierEnvoi = JSON.parse(localStorage.getItem('panier'));
    console.log(panierEnvoi.listeId);
    return panierEnvoi.listeId;

}

//fonction qui appelle le webservice post pour envoyer le contact et la liste de produits
createEnvoiForm = (contact, listeOrder) => {
    let formToPost=new Form(contact,listeOrder);
    fetch('http://localhost:3000/api/cameras/order', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formToPost)
    }
    )
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
        })
        .then((value) => {
            localStorage.setItem("numeroCommande",value.orderId);

        })

}

createBoutonEnvoi();
createFormulaire();
chargerPanier();