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
        fetch("https://orinoco-oc.herokuapp.com/api/cameras/" + idCam.toString())
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
    const panierRecup = JSON.parse(localStorage.getItem('panier'));
    if (panierRecup == null) {
        panier = new Panier([], [], [])
    }
    else {
        panier = new Panier(panierRecup.listeId, panierRecup.listePrice, panierRecup.numberOfProduct);
    }
    const affichagePrix = document.createElement("div");
    let prixPanier;
    if (panier.calculatePrice() == '0') {
        prixPanier = 0;
    } else {
        prixPanier = parseFloat(panier.calculatePrice()) / 100;
    }
    affichagePrix.innerText = "Total : " + prixPanier.toString() + " €";
    affichagePrix.classList.add("Prix");
    document.querySelector(".liste_produits").appendChild(affichagePrix);

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
        inputInfo.setAttribute("required", true);
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
        if (verificationInformations() & verificationPanier()) {
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

                    if (localStorage.getItem('panier') != null) {
                        localStorage.removeItem('panier');
                        document.location.href = "page_confirmation.html";

                    } else {
                        alert("Erreur lors de l'envoi de la commande (Problème Web-service)");
                    }
                });
            })();
        } else {
            alert("Commande non envoyée");
        }
    }
    )
}

//fonction qui va venir vérifier les informations avant d'envoyer le formulaire
verificationInformations = () => {
    let listeForm = ['firstName', 'lastName', 'adress', 'city', 'email'];
    const valideEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const regexChiffres=/[0-9]/
    let objetForm = new Object();
    let objetValidation = new Object();
    for (info of listeForm) {
        objetForm[info] = document.getElementById(info).value;
        console.log(objetForm[info]);
        switch (info) {
            case 'email':
                
                if(valideEmail.test(objetForm[info])==false|objetForm[info].length<1){
                    objetValidation[info] = false;
                }else{
                    objetValidation[info] = true;
                }
                break;
            default:

                if (regexChiffres.test(objetForm[info]) | objetForm[info].length<1) {
                    objetValidation[info] = false;
                    alert(info+" incorrect");
                } else {
                    objetValidation[info] = true;
                }
        }
    }

    if ( objetValidation['email']& objetValidation['firstName'] & objetValidation['lastName'] & objetValidation['adress'] & objetValidation['city']) {
        return true;
    } else {
        return false;
    }
}

//Fonction qui permet de vérifier si le panier n'est pas vide
verificationPanier = () => {
    if (localStorage.getItem('panier') == null) {
        alert("Panier vide");
        return false;
    } else {
        return true;
    }
}




//Appel de toutes les fonctions pour créer les élements de la page
createContenuHeader("page_panier");
chargerPanier();
affichageduPrix();
createFormulaire();
createBoutonEnvoi();
createBoutonViderPanier();
createContenuFooter();