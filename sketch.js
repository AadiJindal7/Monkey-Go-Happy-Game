PLAY = 1;
END = 0;

var gameState = PLAY;

var jungle;

var monkey , monkey_running

var ground;

var banana ,bananaImage, obstacle, obstacleImage

var FoodGroup, obstacleGroup

var score
var survivialTime;


var banana;
var stone;

var bananaGroup;
var obstacleGroup;

function preload(){
  
   
  
monkey_running =      loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
monkey_collided = loadAnimation("sprite_0.png");
  
  
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
 bgImage = loadImage("jungle.jpg");
 
}



function setup() {
  
createCanvas(600,200);
  
  jungle = createSprite(300,200,10,10);
  jungle.velocityX = -4;
  jungle.addImage(bgImage);
  jungle.scale = 1.4;
  
  ground = createSprite(300,180,1000,10);
  ground.velocityX = -6;
  
  monkey = createSprite(150,155,10,10);
  monkey.addAnimation("running",monkey_running);  
  monkey.scale = 0.08;
  
  ground.visible = false;
  
  bananaGroup = createGroup();
  obstacleGroup = createGroup();
  
  score = 0;
  survivalTime = 0;
}


function draw() {
  
  background(200);

  
  
  stroke("black");
  textSize(15);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate());
  
  
  
  
  if(gameState === PLAY){
     
    
    
    if(keyDown("space") && monkey.y > 150){
     monkey.velocityY = -13;
    }
    
    monkey.velocityY = monkey.velocityY + 0.8;
    
    if(monkey.isTouching(bananaGroup)){
      
      bananaGroup.destroyEach();
      
      score = +2;
    }
       if (jungle.x < 0){
      jungle.x =150 ;
    }
      
    
    
    
    food();
    obstacles();
    
  }
  
  if(monkey.isTouching(obstacleGroup)){
                                       
     gameState = END
    
     jungle.velocityX = 0;
    
   
  }
  
  
  
   if(ground.x < 100){
     ground.x = 300;
    }
  
 if(gameState === END){
   
    survivalTime = 0;
   
 monkey.changeAnimation("collided",monkey_collided);
   
    }
  
  //console.log(monkey.y);
  
  monkey.collide(ground);
  
  
  drawSprites();
  
  text("Score:-"+ score,530,20);
  text("Survival Time:-" + survivalTime,20,20);
  
  if(gameState === END){
     
    text("Game Over", 250,50);
    
    
    
    monkey.velocityX = 0;
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    
    score = 0;
    
  }
}

function food(){
  
  if(frameCount%120 === 0){
     
    banana = createSprite(600,150,10,10);
    banana.addImage(bananaImage);
    banana.scale = 0.07;
    banana.velocityX = -4;
    banana.lifetime = 150;
    bananaGroup.add(banana);
    
    banana.y = Math.round(random(80,160));
    
     }
  
}

function obstacles(){
  
  if(frameCount % 200 === 0){
     
    stone = createSprite(600,165,10,10);
    stone.addImage(obstacleImage);
    stone.scale = 0.07;
    stone.velocityX = -4;
    stone.lifetime = 150;
    obstacleGroup.add(stone);
    
    
     }
  
}




