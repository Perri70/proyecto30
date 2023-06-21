var player, back;
var points = 0;
var backImg;
var leftPlayerImg;
var rightPlayerImg;
var gameState= "START";
var baseImg, baseGroup;
var goodImg, goodThingsGroup;
var badImg, badThingsGroup;

//Función para cargar imágenes y animaciones
function preload() {
  backImg = loadImage("images/Clouds Back.png")
  leftPlayerImg = loadAnimation("images/willyLeft.png")
  baseImg = loadImage("images/base.png");
  goodImg = loadImage("images/concha_kawai.png")
  badImg = loadImage("images/badthing.png")
}
//Función para declarar Sprites y grupos
function setup() {
  createCanvas(450,800);
  back = createSprite(225,400,20,20);
  back.addImage(backImg);
  back.scale = 0.5;
  player = createSprite(225, 450, 20, 20);
  player.addAnimation("left", leftPlayerImg);
  player.scale = 0.07;
  baseGroup = new Group();
  goodThingsGroup = new Group();
  badThingsGroup = new Group();
}
//Función para dibujar los Sprites y establecer reglas del juego
function draw() {
  background(220);
  drawSprites();
    
  //Puntuación 
   textSize(20);
   fill("#FF0043");
   text("Puntos: " + points, 12, 35);
  //Inicio del juego
  if(gameState==="START" && keyDown("up_arrow")){
      //Cambio de estado
      gameState="PLAY";
    //Velocidad y cambio de estado 
    
     }
  
  if(gameState==="PLAY"){
    //Fondo infinito
    back.velocityY = 1;
    if(back.y > 425){
      back.y = 300;
    }
   
    //gravedad
     player.velocityY = player.velocityY + 0.8;
    //Mover personaje con las flechas 
    if(keyDown("right_arrow")){
    player.x = player.x+3;
  }
  
  if(keyDown("left_arrow")){
    player.x = player.x-3;
  }
  
  if(keyDown("up_arrow")){
    player.velocityY = -4;
  }
    //Crear bases y hacer que el personaje quede sobre ellas
    createBases();
    if(player.isTouching(baseGroup)){
      player.velocityY=0
       }
    //Aumentar puntos
    if(player.isTouching(goodThingsGroup,removeGoodThings)){
     points=points+10; 
    }
    //Crear Cosas Malas 
    createBadThings();
      
    //Cambiar a estado GAMEOVER
    if(player.isTouching(badThingsGroup)){
      gameState="GAMEOVER";
      
    }
  }
  
  //Estado GAMEOVER 
  
  if(gameState==="GAMEOVER"){
    player.velocityY=3;
    back.velocityY=0;
    fill("#ff0000 ")
    text("perdiste Men",50,300);
    badThingsGroup.destroyEach();
    goodThingsGroup.destroyEach();
    baseGroup.destroyEach();
  }

}

//Función para crear bases 
function createBases(){
   if(frameCount % 100 === 0){
     var base = createSprite(random(50,400), 0, 70, 20);         base.velocityY = 2;
      base.addImage(baseImg);
     base.scale = 0.30;
     baseGroup.add(base);
     var good = createSprite(base.x,base.y-25,20,20);
     good.velocityY=2;
     good.addImage(goodImg);
     good.scale=0.12;
     goodThingsGroup.add(good);
     
   }
}

//Función para crear Cosas Malas 

function createBadThings(){
  var velo = 3;
  if(frameCount % 75 === 0){
  var bad = createSprite(random(50,400),0,60,20);
    bad.velocityY=3;
    bad.addImage(badImg);
    bad.scale=0.10;
    badThingsGroup.add(bad);

}
}

//Función para eliminar CosasBuenas
function removeGoodThings(sprite,goodThingsGroup ){
 goodThingsGroup.remove()
}

