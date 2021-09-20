afficherInfosConfirmation=()=>{
    const sectionConfirmation=document.querySelector(".infos");

    //Création des divers élements informatifs
    const remerciements=document.createElement("div");
    remerciements.innerHTML="Votre commande a bien été prise en compte. </br> Merci d'avoir commandé sur Orinoco </br> À bientôt"
    remerciements.classList.add("infos__remerciements");
    const priceConfirmation=document.createElement("div");
    priceConfirmation.classList.add("infos__prix");
    const orderNumberConfirmation=document.createElement("div");
    priceConfirmation.classList.add("infos__numéroCommande");
    const lienAccueil=document.createElement("a");
    lienAccueil.innerText="Cliquez ici pour retourner à l'accueil";
    lienAccueil.setAttribute("href","index.html");

    priceConfirmation.innerText="Numéro de commande : "+JSON.parse(localStorage.getItem('order')).orderId;
    const prix=JSON.parse(localStorage.getItem('totalPrice'));
    let prixAffiche;
    if (prix=='0'){
        prixAffiche='0';
    }else{
        const prixCalcul=parseFloat(prix)/100;
        prixAffiche=+prixCalcul.toString()+" €";
    }
    orderNumberConfirmation.innerText="Prix de votre commande : "+prixAffiche;

    //Ajout des élements fraichement créés à la section
    sectionConfirmation.appendChild(remerciements);
    sectionConfirmation.appendChild(priceConfirmation);
    sectionConfirmation.appendChild(orderNumberConfirmation);
    sectionConfirmation.appendChild(lienAccueil);
}




createContenuHeader("page_confirmation");
afficherInfosConfirmation();
createContenuFooter();