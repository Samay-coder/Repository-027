var dog,happyDog;
var gameState;
var database;
var foodS,foodStock,lastFed,foodObj;
var changeState,readState;
var bedroom,garden,bathroom;
var sadDog
function preload()
{
dogimg = loadImage("images/Dog.png");
happyDog = loadImage("images/happydog.png");
bedroom = loadImage("images/Bed Room.png");
garden = loadImage("images/Garden.png");
bathroom = loadImage("images/Wash Room.png");
sadDog = loadImage("images/Lazy.png");
}

function setup() {
  database=firebase.database();
  readState=database.ref('gameState');
  readState.on("value",function(data){
    gameState = data.val();
  })
  console.log(database)
	createCanvas(500, 500);
  foodStock=database.ref('Food');
  foodStock.on("value", readStock);
  dog=createSprite(250,300,150,150);
  dog.addImage(dogimg);
  dog.scale=0.25
  feed=createButton("Feed the dog")
  feed.position(700,95)
  feed.mousePressed(feedDog);
  addFood=createButton("Add Food")
  addFood.position(800,95)
  addFood.mousePressed(addFoods);
  foodObj=new Food()
}


function draw() {  
  background(46,139,87)

  if (gameState!="hungry") {
    feed.hide();
    addFood.hide();
    dog.remove();
  } else {
    feed.show();
    addFood.show();
    dog.addImage(sadDog);
  }

  fill(255,255,254)
  textSize(15)

  currentTime=hour()
  if (currentTime==(lastFed+1)) {
    update("Playing")
    foodObj.garden();
  } else if (currentTime==(lastFed+2)) {
    update("Sleeping")
    foodObj.bedroom();
  } else if (currentTime>(lastFed+2) && currentTime<=(lastFed+2)) {
    update("Bathing")
    foodObj.bathroom();
  } else {
    update("Hungry")
    foodObj.display();
  }

  if (lastFed>=12) {
    text("Last Feed :" + lastFed%12 + "PM", 350,30)
  }else{
    text("Last Feed :" + lastFed + "AM",350,30)
  }

  drawSprites();

}

function readStock(data) {
  foodS=data.val();
  foodObj.updateFoodStock(foodS)
}

function writeStock(x) {

  if (x<=0) {
    x=0;
  } else {
    x=x-1;
  }

  database.ref('/').update({
    Food:foodStock,
    Food:x
  })
}

function feedDog() {
  dog.addImage(happyDog)

  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods() {
  foodS++
  database.ref('/').update({
    Food:foodS
  })
}

function update(state) {
  database.ref('/').update({
    gameState:state
  })
}