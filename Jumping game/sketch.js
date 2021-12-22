var oceanImg, ocean;
var coinImg, coin, coinGroup;
var climberImg, climber, climbersGroup;
var frog, frogImg;
var gameState = 0;
var score = 0;

function preload(){
  oceanImg = loadImage("water.jpg");
  coinImg = loadImage("coin.png");
  climberImg = loadImage("seaweed.png");
  frogImg = loadImage("frog.png");
  
}

function setup(){
  createCanvas(580,450);
  
  ocean = createSprite(300,300);
  ocean.addImage("ocean",oceanImg);
  //ocean.velocityY = 2;
  frog = createSprite(200,200,50,50);
  frog.scale = 0.1;
  frog.addImage("frog", frogImg);  
  
  //create coin group and climber group
  climbersGroup = new Group();
  coinGroup = new Group();
}

function draw(){
  background('black');
  drawSprites();
  textSize(20);
  fill('red');
  text('Score : ' +score, 300, 80);
  if(ocean.y > 250 ){
    ocean.y = 150;
  }
  if (gameState === 0){
    fill("blue");
    textSize(20);
    text("Press space to start game", 100 ,180);
    if (keyDown('space')){
      gameState = "play";
    }
  }
  if (gameState === "play") {
    ocean.velocityY = 2;
    frog.velocityY = 1;

    if (keyDown("up")){
      frog.y= frog.y-2;
    }

    if (keyDown("right")){
      frog.x= frog.x+2;
    }

    if (keyDown("left")){
      frog.x= frog.x-2;
    }

    if (climbersGroup.isTouching(frog)){
      
    }
    if (frog.y>=430){
      gameState = "end"
    }
    
  }
  
  if (gameState === "end"){
    fill("red");
    textSize(30);
    text("GAME OVER", 150 ,180);
    ocean.velocityY = 0;
    coinGroup.destroyEach();
    climbersGroup.destroyEach();
    frog.velocityY = 2;
  }
  spawnCoin();
  if(frog.isTouching(coinGroup)){
    score = score + 1;
    coinGroup.destroyEach();
  }
  
}

// create the coin and climber in the same function
function spawnCoin() {

  if(frameCount % 280 == 0){

    climber = createSprite(Math.round(random(20,380)),40);
    climber.addImage(climberImg);
    climber.velocityY = 3;
    climber.scale = 0.3;
    climbersGroup.add(climber);
    climber.lifetime = 200;
  
    coin = createSprite(Math.round(random(20,380)),5);
    coin.addImage(coinImg);
    coin.velocityY = 3;
    coin.scale = 0.1;
    coinGroup.add(coin);
    coin.lifetime = 220;
  }
  if (frameCount % 280 === 0) {
    //make the x position of the coin and climber the same
   
  }
}


