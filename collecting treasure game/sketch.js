var path,mainCyclist;
var pathImg,mainRacerImg1,mainRacerImg2;   
let pink1,pink2;
let pl1,pl2;
let pl4,pl5;
let o1,o2,o3;

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;

function preload(){
  pathImg = loadImage("images/Road.png");
  mainRacerImg1=loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  mainRacerImg2= loadAnimation("images/mainPlayer3.png");

  pink1 = loadAnimation("opponent1.png","opponent2.png");
  pink2= loadAnimation("opponent3.png");

  p1 = loadAnimation("opponent4.png","opponent5.png");
  p2= loadAnimation("opponent6.png");

  p3 = loadAnimation("opponent7.png","opponent8.png");
  p4= loadAnimation("opponent9.png");

  ob1=loadImage("obstacle1.png");
  ob2=loadImage("obstacle1.png");
  ob3=loadImage("obstacle3.png");
  
  gameOver=loadImage("gameOver.png")
}

function setup(){
  
  createCanvas(700,300);

// Moving background
  path=createSprite(100,150);
  path.addImage(pathImg);

      //creating boy running  
      mainCyclist  = createSprite(70,150,20,20);
      mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
      mainCyclist.scale=0.07;
      mainCyclist.setCollider("circle",0,0,40); 
      mainCyclist.debug=true;
  
    GameOver=createSprite(300,100,20,20);
    GameOver.addImage(gameOver);
    obstacleG=createGroup();
    mainCyclist.addAnimation("collided",mainRacerImg2 )
  
}

function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,350,30);
  
  if(gameState===PLAY){
  distance = distance + Math.round(getFrameRate()/60);
   mainCyclist.y = World.mouseY;
  GameOver.visible=false;
   edges= createEdgeSprites();
   mainCyclist.collide(edges);
  obstacle();

  path.velocityX=-(6+ 2*distance/150);
  //code to reset the background
  if(path.x < 0 ){
    path.x = width/2;     
  }
   var select_oppPlayer = Math.round(random(1,10))
   
   if(World.frameCount % 150==0){
     if(select_oppPlayer==600){
       obstacle();}   
   }
 mainCyclist.setCollider("circle",-48,-5,590);
  
  //mainCyclist.debug = true;
  if(keyDown("UP_ARROW")){
    reset();
  }
 if(obstacleG.isTouching(mainCyclist)){
   gameState=END;
 }
  
  }
  else if(gameState==END){
    //mainCyclist.changeAnimation("SahilCollided",mainRacerImg2)
 obstacleG.setVelocityEach(0);
   path.velocityX=0;
    mainCyclist.changeAnimation("collided",mainRacerImg2);
    GameOver.visible=true;
  }
}

function obstacle(){
  if(frameCount % 50 ==0){
    ob=createSprite(200,200,20,20)
    ob.scale=0.1;
    ob.setCollider("circle",-10, 2,40);
    ob.debug=true;
    r=Math.round(random(1,6))
    switch (r){
    
    case 1:    
    ob.addImage(ob1) ;    
    break; 
    
    case 2:
    ob.addImage(ob2);
    break;
    
    case 3:
    ob.addImage(ob3);
    break;
    
    case 4:
    ob.addAnimation("pl3Running",p3);
    break;
    
    case 5:
    ob.addAnimation("pl1Running",p1); 
    break;
    
    case 6:
    ob.addAnimation("pinkRunning",pink1);
    break;
     
    default:
    break;
    }
    ob.y= Math.round(random(50,280))
    ob.x=Math.round(random(10,30))
    ob.velocityX=(8+(distance/20));
    ob.setLifetime=300;
    
    position=Math.round(random(1,2))
    
     obstacleG.add(ob)
} 
}

function reset(){
  gameState=PLAY;
  gameOver.visible=false;
  
  pl.destroyEach();
  YellowCG.destroyEach();
  PinkCG.destroyEach();
  distance=0;
}