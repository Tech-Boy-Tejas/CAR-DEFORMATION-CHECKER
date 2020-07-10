var motionState = nil;
var car,wall,carImgdefault,carImg_red,carImg_yellow,carImg_green;
var speed,weight;
var deformation;
var slowMotion_sprite;
var invisible_wall;

function preload(){
  carImgdefault = loadImage("car 0.png");
  carImg_red = loadImage("car_red0.png");
  carImg_green = loadImage("car_green0.png");
  carImg_yellow = loadImage("car_yellow0.png");
}

function setup() {
  createCanvas(1600,400);
  
  car = createSprite(50,200);
  car.addImage(carImgdefault);

  car.scale = 0.2;

  wall = createSprite(1500,200,60,200);
  wall.shapeColor = "white";

  speed = Math.round(random(55,90));
  weight = Math.round(random(400,1500));

  slowMotion_sprite = createSprite(860,35,150,40);
 
  invisible_wall = createSprite(1435,200,20,200);
  invisible_wall.visible = false;
}

function draw() {
    background(0); 

    car.velocityX = speed;
    slowMotion_sprite.shapeColor = "black";

    deformation = Math.round((0.5 * weight * speed * speed)/ 22500);

    fill("white");
    text("Speed: " + speed,20,20);
    text("Weight: " + weight,20, 40);
    text("Deformation: " + deformation,20,60);

      if(deformation >= 101 && wall.x - car.x < (wall.width + car.width + 20)/2){
        slowMotion_sprite.shapeColor = "yellow";
          if(deformation >= 101 && deformation < 180){
            car.velocityX = 0;
            car.addImage(carImg_yellow);
            wall.shapeColor = "yellow";
          }
          else if(deformation >= 180){
            car.velocityX = 0;
            car.addImage(carImg_red);
            wall.shapeColor = "red";
          }
          if(mousePressedOver(slowMotion_sprite)){
            motionState = "slowMotion";
            car.x = 0;
          }
      }

      if(deformation <= 100 && wall.x - car.x < (wall.width + car.width + 22)/2){
        slowMotion_sprite.shapeColor = "yellow";
        if(deformation < 100){
          car.velocityX = 0;
          car.addImage(carImg_green);
          wall.shapeColor = "green";
        }
        if(mousePressedOver(slowMotion_sprite)){
          motionState = "slowMotion";
          car.x = 0;
        }
      }
      if(motionState === "slowMotion"){
        car.velocityX = 5;
        car.collide(wall);
      }
      

    drawSprites();

    textSize(13);
    fill("red");
    text("VIEW IN SLOW MOTION",787,40);
}