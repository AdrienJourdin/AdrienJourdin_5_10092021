afficherInfosConfirmation=()=>{
    const sectionConfirmation=document.querySelector(".infos");
    const priceConfirmation=document.createElement("div");
    priceConfirmation.classList.add("infos__Prix");
    const orderNumberConfirmation=document.createElement("div");
    priceConfirmation.classList.add("infos__NuméroCommande");
    sectionConfirmation.appendChild(priceConfirmation);
    sectionConfirmation.appendChild(orderNumberConfirmation);
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
}

afficherInfosConfirmation();