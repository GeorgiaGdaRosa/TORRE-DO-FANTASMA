var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameOver;
var reset ;
const play = 1 
const end = 0
let gameState = play

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  gameOverImg = loadImage("gameOver.png");
  resetImg = loadImage("reset.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();

  ghost = createSprite(300,60,);
  ghost.addImage(ghostImg);
  ghost.scale = 0.3;
  ghost.setCollider("rectangle",-30,30,80,250,0)

  gameOver = createSprite(300,300)
  gameOver.addImage(gameOverImg)
  gameOver.visible = false
  gameOver.scale = 3
  reset= createSprite(300,400)
  reset.addImage(resetImg)
  reset.visible= false
  reset.scale = 0.6
}

function draw() {
  background(200);
  
  if(tower.y > 400){
      tower.y = 300
    }
    
    ghost.velocityY += 1

      GerarPortas()
    
      if(ghost.isTouching(climbersGroup) || ghost.y >650){
      gameState = end
    }

       if(gameState == play) {
      
        if(keyDown("left")){
        ghost.x = ghost.x - 3
      }
  
       if(keyDown("right")){
        ghost.x += 3
      }
  
        if(keyDown("space")){
        ghost.velocityY = -5

      }
        }
        
        if (gameState === end){
          doorsGroup.setVelocityYEach(0)
          climbersGroup.setVelocityYEach(0)
          invisibleBlockGroup.setVelocityYEach(0)
          ghost.velocityY = 0
          gameOver.visible = true
          reset.visible = true
          tower.velocityY = 0
          
        }

        if(mousePressedOver(reset)){
          resetGame()
          touches= []
        }

    drawSprites()
    fill("black")
    text(mouseX+" - "+ mouseY, mouseX, mouseY)

    
}

function GerarPortas(){
  if(frameCount%240==0){
    door = createSprite(random(100,500),-50)
    door.velocityY = 1
    door.addImage(doorImg)
    door.lifetime = 800
    door.depth = ghost.depth - 1
    doorsGroup.add(door)
    

    climber = createSprite(door.x,door.y+50,100,10)
    climber.velocityY = 1
    climber.addImage(climberImg)
    climber.lifetime = 800
    climbersGroup.add(climber)

    invisibleBlock = createSprite(climber.x, climber.y +10,100,10)
    invisibleBlock.velocityY = 1
    invisibleBlock.lifetime = 800
    invisibleBlock.visible = false
    invisibleBlockGroup.add(invisibleBlock)

  }
}

function resetGame(){
  gameState = play
  ghost.y = 60
  gameOver.visible = false
  reset.visible= false
  tower.velocityY = 1
  doorsGroup.destroyEach()
  climbersGroup.destroyEach()
  invisibleBlockGroup.destroyEach()
  
}