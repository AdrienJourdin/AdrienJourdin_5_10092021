afficherInfosConfirmation=()=>{
    let sectionConfirmation=document.querySelector(".infos");
    let priceConfirmation=document.createElement("div");
    priceConfirmation.classList.add("infos__Prix");
    let orderNumberConfirmation=document.createElement("div");
    priceConfirmation.classList.add("infos__NuméroCommande");
    sectionConfirmation.appendChild(priceConfirmation);
    sectionConfirmation.appendChild(orderNumberConfirmation);
    priceConfirmation.innerText="Numéro de commande : "+JSON.parse(localStorage.getItem('order')).orderId;
    orderNumberConfirmation.innerText="Prix de votre commande : "+JSON.parse(localStorage.getItem('totalPrice'));
}

afficherInfosConfirmation();