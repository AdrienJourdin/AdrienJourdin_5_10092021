class Panier{
    constructor(){
        this.listeId=[];
        this.listePrice=[];
        this.numberOfProduct=[];
    }

    addToCart=(camera)=>{
        this.listeId.push(camera._id);
        this.listePrice.push(camera.price);
        console.log("listeId",this.listeId);
    }
    
    removeToCart=(camera)=>{
        let indexToRemove=this.listeId.indexOf(camera._id);
        this.listeId.splice(indexToRemove,indexToRemove-1);
        this.listePrice.splice(indexToRemove,indexToRemove-1);
    }
    calculatePrice=()=>{
        let sum=0;
        for(let price of this.listePrice){
            sum+=price;
        }
        return sum;
    }
}