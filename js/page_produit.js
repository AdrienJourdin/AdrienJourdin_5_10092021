var idProduct = localStorage.getItem('idProduct');

const chargerProduct = () => {
    fetch("http://localhost:3000/api/cameras/" + idProduct.toString())
        .then((res) => {
            console.log("http://localhost:3000/api/cameras/" + idProduct.toString());
            if (res.ok) {
                return res.json();
            }
        })
        .then((value) => {
            const cam = value;
            console.log(cam);
            let objetCam = new Camera(cam.lenses, cam._id, cam.name, cam.price, cam.description, cam.imageUrl);
            createCamHTML(objetCam, "camera", "produit");


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

    let sectionCam = document.createElement("section");
    let body= document.querySelector("body");
    sectionCam.classList.add(sectionName);
    body.appendChild(sectionCam);
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
createPanier=()=>{
    let panier=[];
    let body=document.querySelector("body");
    let ajoutPanier=document.createElement('a');
    body.classList.add("Ajout_Panier");
    ajoutPanier.innerText="Ajout au panier";
    body.appendChild(ajoutPanier);
    ajoutPanier.addEventListener('click',(e)=>{
        e.preventDefault();
        e.stopPropagation();
        let pan=localStorage.getItem('panier');
        if(pan.includes("idProduct")){
            alert("ce produit est deja dans votre panier");
        }else{
            panier=localStorage.getItem('panier');
            console.log(panier);
            panier.push(idProduct);
            localStorage.setItem('panier', panier);
        }
    })
}



createPanier();
