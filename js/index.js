



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
      console.log(cameras);
      for (const cam of cameras) {
        objetCam = new Camera(cam.lenses, cam._id, cam.name, cam.price, cam.description, cam.imageUrl);
        camerasOBJ.push(objetCam);
        createCamHTML(objetCam, "camera", "affichage");

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
createCamHTML = (objet, className, sectionName) => {
  let sectionCam = document.querySelector("." + sectionName);
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
        Image.src = imageUrl;
      })
  }

}
chargerAllCameras();


const camera1 = new Camera([123, 1], "123123", "name_cam1", 350000, "c'est une caméra", "urlquelconque");
camerasOBJ.push(camera1);











