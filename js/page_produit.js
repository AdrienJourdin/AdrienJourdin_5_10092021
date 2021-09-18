var idProduct = window.location.search.substr(1);

const chargerProduct = () => {
  fetch("http://localhost:3000/api/cameras/" + idProduct)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((value) => {
      const cam = value;
      let objetCam = new Camera(cam.lenses, cam._id, cam.name, cam.price, cam.description, cam.imageUrl);
      afficherProduits(cam, "liste_produits", 1, 'page_produit');
      localStorage.setItem("objectSelected", JSON.stringify(objetCam));
      createMenuDeroulantOption(objetCam);
    })
    .catch((err) => {
      alert(err);
    })
    .finally(() => {
    }

    );
}


//appel de la fonction pour charger le produit sélectionné précédemment
chargerProduct();


//Creation du bouton ajout au panier
createAjoutAuPanier = () => {
  let body = document.querySelector("body");
  let ajoutPanier = document.createElement('a');
  body.classList.add("Ajout_Panier");
  ajoutPanier.innerText = "Ajout au panier";
  body.appendChild(ajoutPanier);
  ajoutPanier.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    let panier = JSON.parse(localStorage.getItem('panier'));
    if (panier == null) {
      panier = new Panier([], [], []);
    }
    let camToAdd = JSON.parse(localStorage.getItem('objectSelected'));
    let panier2 = new Panier(panier.listeId, panier.listePrice, panier.numberOfProduct);
    panier2.addToCart(camToAdd);
    localStorage.setItem('panier', JSON.stringify(panier2));
  }
  )
}

//Modifier l'affichage des options lentilles pour en faire un menu déroulant
createMenuDeroulantOption=(objet)=>{
  let listeOptions=objet.lense;
  let lensesLabel=document.createElement("label");
  lensesLabel.setAttribute("for","lense-select");
  lensesLabel.innerText="Choississez une lentille";
  let lensesElem=document.querySelector(".camera__lenses");
  lensesElem.innerText="";
  let select=document.createElement("select");
  select.setAttribute("id","lense_select");
  lensesElem.appendChild(select);
  for(let option of listeOptions){
    let optionHTML=document.createElement("option");
    optionHTML.setAttribute("value",option);
    optionHTML.innerText=option;
    select.appendChild(optionHTML);
  }
  selectionLense();
}

//Fonction qui permet de stocker l'option choisie par l'utilisateur
selectionLense=()=>{

}

createRetirerDuPanier = () => {
  let body = document.querySelector("body");
  let retraitPanier = document.createElement('a');
  body.classList.add("Retrait_Panier");
  retraitPanier.innerText = "Retirer du panier";
  body.appendChild(retraitPanier);
  retraitPanier.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    let panier = JSON.parse(localStorage.getItem('panier'));
    if (panier == null) {
      panier = new Panier([], [], []);
    }
    let camToRemove = JSON.parse(localStorage.getItem('objectSelected'));
    let panier2 = new Panier(panier.listeId, panier.listePrice, panier.numberOfProduct);
    panier2.RemoveToCart(camToRemove);

    localStorage.setItem('panier', JSON.stringify(panier2));
  }
  )
}

createViderLePanier = () => {
  let body = document.querySelector("body");
  let viderPanier = document.createElement('a');
  body.classList.add("Vider_Panier");
  viderPanier.innerText = "Vider le panier";
  body.appendChild(viderPanier);
  viderPanier.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    localStorage.removeItem('panier');
    panier2 = new Panier([], [], []);
  }
  )
}


createAjoutAuPanier();
createRetirerDuPanier();
createViderLePanier();