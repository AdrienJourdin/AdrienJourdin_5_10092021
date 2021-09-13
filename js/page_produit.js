var idProduct = localStorage.getItem('idProduct');

const chargerProduct = () => {
  fetch("http://localhost:3000/api/cameras/" + idProduct.toString())
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((value) => {
      const cam = value;
      console.log(cam);
      let objetCam = new Camera(cam.lenses, cam._id, cam.name, cam.price, cam.description, cam.imageUrl);
      createCamHTML(objetCam, "camera", "panier");
      localStorage.setItem("objectSelected", JSON.stringify(objetCam));

    })
    .catch((err) => {
      alert(err);
    })
    .finally(() => {
    }

    );
}

//crée le bloc camera 
createCamHTML = (objet, className, sectionName) => {
  let sectionCam = document.querySelector(".produit");
  const divCam = document.createElement("div");
  divCam.classList.add(className);
  sectionCam.appendChild(divCam);
  let arrayProperty = Object.getOwnPropertyNames(objet);
  for (propertyName of arrayProperty) {
    createElementCameraHTML(objet, className, propertyName);
  }

}

//Fonction pour créer un élément d'un bloc, cette fonction sera ensuite contenue dans la fonction createCameraHTML(qui elle crée le bloc camera)
createElementCameraHTML = (objet, className, param) => {
  let divCam = document.querySelector("." + className);
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

//appel de la fonction pour charger le produit sélectionné précédemment
chargerProduct();


//Creation de la div panier
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
    console.log("panier2", panier2);
    localStorage.setItem('panier', JSON.stringify(panier2));
  }
  )
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
    console.log("panier2", panier2);
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