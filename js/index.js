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

        afficherProduits(objetCam,"liste_produits",numberCam,'accueil');

      }
    })
    .catch((err) => {
      alert(err);
    })
    .finally(() => {
    }

    );
}




chargerAllCameras();











