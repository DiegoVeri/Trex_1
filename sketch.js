var PLAY=1; 
var END=0;

var Gamestate=PLAY;

var trex, trex_running, trex_collided, floor, ground, floor_2, cloud, clouds_1, obstacle_3, obstacle_4, obstacle_5, obstacle_6, obstacle_7, obstacle_8, score, cloudsGroup, obstaclesGroup; 

var GameOver, Game_Over;

var Restart, restart;

var Dead;

var Jump;

var Checkpoint;

function preload(){
  trex_running =      loadAnimation("trex1.png","trex3.png","trex4.png");
 
  ground =
  loadImage("ground2.png");
  
 clouds_1 =
   loadImage("cloud.png");
  
  obstacle_3 = loadImage("obstacle1.png");
  
  obstacle_4 = loadImage("obstacle2.png");
  
  obstacle_5 = loadImage("obstacle3.png");
  
  obstacle_6 = loadImage("obstacle4.png");
  
  obstacle_7 = loadImage("obstacle5.png");
  
  obstacle_8 = loadImage("obstacle6.png");
  
  Game_Over = loadImage("gameOver.png");
  
  restart = loadImage("restart.png");
  
  Dead = loadSound("die.mp3");
  
  Jump = loadSound("jump.mp3");
  
  Checkpoint = loadSound("checkPoint.mp3");
  
  trex_collided = loadImage("trex_collided.png");
  
}
function setup(){
  createCanvas(200,100);
  
  //console.log("hola "+"adios");

  var Run=Math.round(random(1,100));
  //console.log(Run);
  
  cloudsGroup=new Group();
  
  obstaclesGroup=new Group();

  
  score=0;

  trex = createSprite(30,80,15,20);
  trex.addAnimation("running",trex_running);
  trex.addAnimation("collided", trex_collided);
  
  trex.scale = 0.4;
  trex.x= 30;
  trex.setCollider("circle",0,0,40);
  //trex.debug=true;

  floor = createSprite(100, 90, 200, 10);
  floor.visible=false;
  
  floor_2 = createSprite(100, 80, 200, 10);
  floor_2.addImage(ground);
  floor_2.velocityX=-(3+ 3*score/300);
  
  GameOver = createSprite(100, 35, 15, 15);
  GameOver.addImage(Game_Over);
  GameOver.scale=0.4;
  
  Restart = createSprite(100, 55, 15, 15);
  Restart.addImage(restart);
  Restart.scale=0.2;
  
  edges = createEdgeSprites();
}


function draw(){

  background(180);
  

  
  if (Gamestate===PLAY){
      floor_2.velocityX=-(3+ 3*score/300);  
      if(floor_2.x<0){
        floor_2.x=100;
      }
     score= score+Math.round(getFrameRate()/60 );
      if(keyDown("space")&& trex.y>=65){
    trex.velocityY = -8;
    Jump.play();
      }
    
    trex.velocityY = trex.velocityY + 0.5;
    spawnClouds();
    obstacles();
    GameOver.visible=false;
    Restart.visible=false;
    
    if(score>0 && score % 100===0){
    Checkpoint.play();  
    }
    
    trex.changeAnimation("running",trex_running);
    
    if (obstaclesGroup.isTouching(trex)){
    Dead.play();
    Gamestate=END;
    }
    
  
      }
  else if(Gamestate===END){
        floor_2.velocityX=0;
        obstaclesGroup.setLifetimeEach(-1);  
        cloudsGroup.setLifetimeEach(-1);
        trex.velocityY=0;
        obstaclesGroup.setVelocityXEach(0);
        cloudsGroup.setVelocityXEach(0);
        GameOver.visible=true;
        Restart.visible=true;
        trex.changeAnimation("collided",trex_collided);
        
    if (mousePressedOver(Restart)){
  console.log("ffff")
  Reset();
}  
        
          }

  
  //console.log(trex.y);
  
  text("score: "+score, 130, 15);
 
  
  
  
  //console.log(floor.x);

  trex.collide(floor);
  
  //console.warn("texto");
  
 
  
  drawSprites();
  
}

function spawnClouds(){
  
  
  
  if (frameCount % 30 === 0){
    
 cloud=createSprite(200, 30, 20, 15);
  
    cloud.velocityX=-(3+ 3*score/300);
   cloud.addImage(clouds_1);
    cloud.scale=0.4;
    cloud.y=Math.round(random(5, 30));
    cloud.depth=trex.depth;
    trex.depth=cloud.depth+1;
    cloud.lifetime=70;
cloudsGroup.add(cloud);
  }
  
  

  
}

function obstacles(){
  

  
  if(frameCount % 40 === 0){
  obstacle=createSprite(200,75,10,10);
  obstacle.velocityX=-(3+ 3*score/300);
  
    
   var obstacle_2=Math.round(random(1, 6));
    switch(obstacle_2){
        case 1: obstacle.addImage(obstacle_3);
        break;
        case 2: obstacle.addImage(obstacle_4);
        break;
        case 3: obstacle.addImage(obstacle_5);
        break;
        case 4: obstacle.addImage(obstacle_6);
        break;
        case 5: obstacle.addImage(obstacle_7);
        break;
        case 6: obstacle.addImage(obstacle_8);
        break;
        default:break;
        
    }
    obstacle.scale=0.3;
    obstacle.lifetime=70;
    obstaclesGroup.add(obstacle);
    //obstacle.debug=true;
  }
}

  function Reset(){
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  score=0;
  
  Gamestate=PLAY;
}