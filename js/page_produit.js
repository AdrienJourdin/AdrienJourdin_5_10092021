var idProduct = window.location.search.substr(1);

const chargerProduct = () => {
  fetch("https://orinoco-oc.herokuapp.com/api/cameras/" + idProduct)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((value) => {
      const cam = value;
      const objetCam = new Camera(cam.lenses, cam._id, cam.name, cam.price, cam.description, cam.imageUrl);
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
  const sectionProduits = document.querySelector(".liste_produits");
  let ajoutPanier = document.createElement('div');
  ajoutPanier.classList.add("Ajout_Panier");
  ajoutPanier.innerText = "Ajout au panier";
  sectionProduits.appendChild(ajoutPanier);
  ajoutPanier.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    let panier = JSON.parse(localStorage.getItem('panier'));
    if (panier == null) {
      panier = new Panier([], [], []);
    }
    const camToAdd = JSON.parse(localStorage.getItem('objectSelected'));
    let objetPanier = new Panier(panier.listeId, panier.listePrice, panier.numberOfProduct);
    objetPanier.addToCart(camToAdd);
    localStorage.setItem('panier', JSON.stringify(objetPanier));
  }
  )
}

//Modifier l'affichage des options lentilles pour en faire un menu déroulant


//Fonction qui permet de stocker l'option choisie par l'utilisateur


createRetirerDuPanier = () => {
  const sectionProduits = document.querySelector(".liste_produits");
  const retraitPanier = document.createElement('div');
  retraitPanier.classList.add("Retrait_Panier");
  retraitPanier.innerText = "Retirer du panier";
  sectionProduits.appendChild(retraitPanier);
  retraitPanier.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    let panier = JSON.parse(localStorage.getItem('panier'));
    if (panier == null) {
      panier = new Panier([], [], []);
    }
    const camToRemove = JSON.parse(localStorage.getItem('objectSelected'));
    const objetPanier = new Panier(panier.listeId, panier.listePrice, panier.numberOfProduct);
    objetPanier.RemoveToCart(camToRemove);
    localStorage.setItem('panier', JSON.stringify(objetPanier));
  }
  )
}

createViderLePanier = () => {
  const header = document.querySelector("header");
  const viderPanier = document.createElement('div');
  viderPanier.classList.add("Vider_Panier");
  viderPanier.innerText = "Vider le panier";
  header.appendChild(viderPanier);
  viderPanier.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    localStorage.removeItem('panier');
    objetPanier = new Panier([], [], []);
  }
  )
}

createMenuDeroulantOption=(objet)=>{
  const listeOptions=objet.lense;
  const lensesLabel=document.createElement("label");
  lensesLabel.setAttribute("for","lense-select");
  lensesLabel.innerText="Choississez une lentille";
  const lensesElem=document.querySelector(".camera__lenses");
  lensesElem.innerText="";
  const select=document.createElement("select");
  select.setAttribute("id","lense_select");
  lensesElem.appendChild(select);
  for(let option of listeOptions){
    const optionHTML=document.createElement("option");
    optionHTML.setAttribute("value",option);
    optionHTML.innerText=option;
    select.appendChild(optionHTML);
  }
}
createContenuHeader("page_produit");
createAjoutAuPanier();
createRetirerDuPanier();
createViderLePanier();
createContenuFooter();
createContenuFooter();