class Food{
    constructor(){
        this.foodStock=0;
        this.lastFed;
    }

getFoodStock() {
        /*var FoodRef  = database.ref('Food');
    FoodRef.on("value",function(data){
       foodStock = data.val();*/
       return this.foodStock
}
updateFoodStock(foodStock) {
    this.foodStock=foodStock
    }

deductFood() {
    if(this.foodStock>0){
        this.foodStock=this.foodStock-1
        
      }
    }

    getFedTime(lastFed){
        this.lastFed=this.lastFed
    }

    display(){
        var x=80,y=100
        rectMode (CENTER)
        rect(720,220,70,70)
        if (this.foodStock!=0) {
            for (var i =0 ;i <this.foodStock;i++){
                if (i%10==0) {
                    x=80
                    y=y+50
                } 
                rect(x,y,50,50)
                x=x+30          
            }
        }
    }

bedroom(){
    background(bedroom,550,550)
}

garden(){
    background(garden,550,550)
}

bathroom(){
    background(bathroom,550,550)
}
}