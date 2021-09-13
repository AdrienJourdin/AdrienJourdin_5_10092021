const camerasOBJ = [];
const chargerAllCameras = () => {
  fetch("http://localhost:3000/api/cameras/")
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((value) => {
      const cameras = value;
      let numberCam=0;
      for (const cam of cameras) {
        objetCam = new Camera(cam.lenses, cam._id, cam.name, cam.price, cam.description, cam.imageUrl);
        camerasOBJ.push(objetCam);
        numberCam++;
        createCamHTML(objetCam, "camera", "liste_produits",numberCam);

      }
    })
    .catch((err) => {
      alert(err);
    })
    .finally(() => {
    }

    );
}

//Fonction pour créer un bloc camera qui contient des éléments pour chaque propriété de l'objet caméra
createCamHTML = (objet, className, sectionName,numberCam) => {
  let sectionCam = document.querySelector("." + sectionName);
  let divCam = document.createElement("a");
  sectionCam.appendChild(divCam);
  divCam.setAttribute("href", "page_produit.html"); 
  CreateLinkProduct(objet._id,divCam);
  divCam.classList.add(className);

  let arrayProperty = Object.getOwnPropertyNames(objet);
  for (propertyName of arrayProperty) {
    createElementCameraHTML(objet, className, propertyName,numberCam);
  }

}

//Fonction pour créer un élément d'un bloc, cette fonction sera ensuite contenue dans la fonction createCameraHTML(qui elle crée le bloc camera)
createElementCameraHTML = (objet, className, param,numberCam) => {
  let divCam = document.querySelector("." + className+":nth-child("+numberCam+")");
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
//Création du lien de destination lors du clic sur un produit
CreateLinkProduct =(idProduct,element)=>{
  element.addEventListener('click',()=>{
    localStorage.removeItem('idProduct');
    localStorage.setItem('idProduct', idProduct);

  }
  )
}



chargerAllCameras();











