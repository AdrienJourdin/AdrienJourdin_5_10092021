class Panier {
    constructor(listeId, listePrice,numberOfProduct) {
        this.listeId = listeId;
        this.listePrice = listePrice;
        this.numberOfProduct = numberOfProduct;
    }

    addToCart = (camera) => {
        //Si le produit est deja dans le panier on augmente sa quantité de 1
        if (this.listeId.includes(camera._id)) {
            let indexCam = this.listeId.indexOf(camera._id);
            this.numberOfProduct[indexCam]=this.numberOfProduct[indexCam]+1;
        }
        //Si le produit n'y est pas on l'ajoute au panier et on fixe sa quantité à 1
        else {
            this.listeId.push(camera._id);
            this.listePrice.push(camera.price);
            this.numberOfProduct.push(1);
        }
    }

    RemoveToCart = (camera) => {
        
        let indexToRemove = this.listeId.indexOf(camera._id);
        if (this.listeId.includes(camera._id)) {
            //si le nombre de produit est supérieur à 1 alors on retire une quantité au produit
            if (this.numberOfProduct[indexToRemove] > 1) {
                this.numberOfProduct[indexToRemove]-=1;
            }
            //Si le nombre de produit est inférieur ou égale à 1 on retire le produit du panier totalement
            else {
                this.listeId.splice(indexToRemove, 1 );
                this.listePrice.splice(indexToRemove, 1 );
                this.numberOfProduct.splice(indexToRemove, 1 );
            }
        }
        else{
            alert("aucun produit de cette référence ne se trouve dans le panier")
        }
    }
    calculatePrice = () => {
        let sum = 0;
        let i=0;
        for (let price of this.listePrice) {
            sum += price*this.numberOfProduct[i];
            i++;
        }
        return sum;
    }
}