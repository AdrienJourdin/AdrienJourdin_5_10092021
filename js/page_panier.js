//fonction qui affiche toutes les produits situés dans le panier
chargerPanier = () => {
    let = numberCam = 0;
    let panierRecup = JSON.parse(localStorage.getItem('panier'));
    if (panierRecup == null) {
        panier = new Panier([], [], [])
    }
    else {
        panier = new Panier(panierRecup.listeId, panierRecup.listePrice, panierRecup.numberOfProduct);
    }
    //Pour chaque Id dans la listeID du panier on appelle la fonction afficherproduit qui affiche les infos d'un produit
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
                let objetCam = new Camera(cam.lenses, cam._id, cam.name, cam.price, cam.description, cam.imageUrl); //Creation d'un objet avec les infos chargées via le web service
                afficherProduits(objetCam, "liste_produits", numberCam, 'panier');
                //createBoutonAjoutPanier("camera", objetCam, numberCam);
                //createBoutonRetraitPanier("camera", objetCam, numberCam);
                createElementNumberOfProduct("camera", objetCam, numberCam);
            })
            .catch((err) => {
                alert(err);
            })
            .finally(() => {
            }

            );

    }
}

//Fonction qui affiche le prix
affichageduPrix = () => {
    let panierRecup = JSON.parse(localStorage.getItem('panier'));
    panier = new Panier(panierRecup.listeId, panierRecup.listePrice, panierRecup.numberOfProduct);
    let affichagePanier = document.createElement("div");
    affichagePanier.innerText = "Total : " + panier.calculatePrice();
    document.querySelector(".liste_produits").appendChild(affichagePanier);

}



//fonction qui crée la liste des input du formulaire
createFormulaire = () => {
    let listeForm = ['firstName', 'lastName', 'adress', 'city', 'email'];

    let formulaire = document.createElement("form");
    let sectionForm = document.querySelector(".formulaire");
    sectionForm.appendChild(formulaire);
    //Pour chaques infos on créé un input couplé à un label
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
    let panierRecup = JSON.parse(localStorage.getItem('panier'));
    boutonForm.addEventListener('click', () => {
        let form = {
            "contact": {
                firstName: document.getElementById("firstName").value,
                lastName: document.getElementById("lastName").value,
                address: document.getElementById("adress").value,
                city: document.getElementById("city").value,
                email: document.getElementById("email").value,
            },
            products: panierRecup.listeId
        };
        (async () => {
            const envoiForm = fetch("https://orinoco-oc.herokuapp.com/api/cameras/order", {
                method: "POST",
                headers: {
                    'Accept': 'application/JSON',
                    'Content-Type': 'application/JSON'
                },
                body: JSON.stringify(form),
            }).then((response) => {
                if (response.ok) {
                    return response.json();
                  }
            }).then((data) => {
                let panierRecup = JSON.parse(localStorage.getItem('panier'));
                panierCalculatePrice = new Panier(panierRecup.listeId, panierRecup.listePrice, panierRecup.numberOfProduct);
                localStorage.setItem('order', JSON.stringify(data));
                localStorage.setItem('totalPrice', JSON.stringify(panierCalculatePrice.calculatePrice()));
                localStorage.removeItem('panier');
                document.location.href="page_confirmation.html";
            });
        })();
        //createEnvoiForm(createContactObject("formulaire"), createListeProduct());
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

//Creation de la liste de produits contenus dans le panier (liste qui sera envoyé lors de l'appel du web service POST)
createListeProduct = () => {
    let panierEnvoi = JSON.parse(localStorage.getItem('panier'));
    return panierEnvoi.listeId;

}

//fonction qui appelle le webservice post pour envoyer le contact et la liste de produits
createEnvoiForm = (contact, listeOrder) => {
    let formToPost = new Form(contact, listeOrder);
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
            localStorage.setItem("numeroCommande", value.orderId);

        })

}


//Appel de toutes les fonctions pour créer les élements de la page

chargerPanier();
affichageduPrix();
createFormulaire();
createBoutonEnvoi();
createBoutonViderPanier();