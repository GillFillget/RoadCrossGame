//location of "Chicken"
var chickeny = 390;
var chickenx = 299;
//cross highway trips
var score = 0;
//speed of the "chicken", usually at 1
var speedOfChickOriginal = 2;
var speedOfChick;

var Cars = [];
var lanes = [1, 2, 3, 4, 5, 6, 7, 8];
var hits = 0;
var gameoverspeed = 0;
var gameOver = 0;
var carSpeedHack = 3;
var chickenCooldown = 0;

function setup() {
  createCanvas(600, 400);
  //changes text size and text alignment for scoreboard
  textSize(40);
  speedOfChick = speedOfChickOriginal
  textAlign(CENTER, CENTER);
  for (var i = 0; i < 1; i++) { //noprotect
    Cars[i] = new car(random(0, width), random(lanes), random(100));
  }
}


function draw() {
  fill(255);
  background(200);
  //Highway middle line
  strokeWeight(3);
  line(0, height / 2, width, height / 2);
  //Highway lanes
  strokeWeight(1);
  for (var lines = 0; lines < 9; lines++) { //noprotect
    line(0, lines * 45 + 20, width, lines * 45 + 20)
  }
  if(chickenCooldown>0){
   speedOfChick = 0; 
    chickenCooldown+=-1
  }else{
    speedOfChick = speedOfChickOriginal
  }
  
  if (hits==5){
    speedOfChick = 0;
    gameoverspeed = 3;
    gameOver = 1;
  }
  if(mouseIsPressed&&gameOver == 1){
    speedOfChick = speedOfChickOriginal;
    gameoverspeed = 0;
    gameOver = 0;
    hits = 0;
    score = 0;
    chickenx = width/2
  }
  
  chicken();
  
	if(gameOver == 1){
    fill(210);
    rect(-1,380,width+1,height+1);
    fill(0);
    textSize(50);
    text("GAME OVER",width/2,height/2);
  }
  //loop for cars
  for (var l = 0; l < Cars.length; l++) { //noprotect
    Cars[l].move();
    Cars[l].display();
    //detects and reacts to car hitting chicken
    if (Cars[l].collision()) {
      hits++
      chickeny = 390
      chickenCooldown = 60
    }
  }
  //scoreboard for trips cross highway
  textSize(30);
  fill(0);
  text(score, 30, 35);
}

function chicken() {
  //chicken body
  fill(255 - (hits * 20));
  ellipse(chickenx, chickeny, 10, 10);
  if (keyIsDown(UP_ARROW))
    chickeny -= speedOfChick;
  if (keyIsDown(DOWN_ARROW))
    chickeny += speedOfChick;
  if (keyIsDown(RIGHT_ARROW))
    chickenx += (speedOfChick)
  if (keyIsDown(LEFT_ARROW))
    chickenx -= (speedOfChick)
  //detects end of highway
  if (chickeny < 10) {
    //resets position
    chickeny = 390;
    //adds point
    score++
    //adds movement delay
    chickenCooldown = 20
    Cars[score] = new car(width, random(lanes), random(100));
  }
  //creates invisible wall at starting point and edge walls
  if (chickeny > 390) {
    chickeny = 390;
  }
  if (chickenx < 10) {
    chickenx = 10;
  }
  if (chickenx > width - 10) {
    chickenx = width - 10;
  }
}

//constructor for cars
function car(x, y, coloring) {
  this.x = x;
  this.y = (y * 45) - 20;
  this.longness = 60;
  this.color = coloring;
  this.speed = random(-1,2)

  this.move = function() {
    if (this.y > height / 2) {
      this.x = this.x + (gameoverspeed+(score * 0.25) + this.speed+carSpeedHack);
    } else {
      this.x = this.x - (gameoverspeed+(score * 0.25) + this.speed+carSpeedHack);
    }
    if (this.x < -61) {
      this.speed = random(-2,2)
      this.x = width + 60;
      this.y = (random(lanes) * 45) - 20;
    }
    if (this.x > width + 61) {
      this.speed = random(-2,2)
      this.x = -60;
      this.y = (random(lanes) * 45) - 20;
    }
  }

  this.display = function() {
    fill(this.color);
    rect(this.x, this.y - 5, this.longness, 45)
  }

  this.collision = function() {
    if (chickenx > this.x && chickenx < this.x + this.longness && chickeny > this.y - 10 && chickeny < this.y + 45) {
      return true;
    } else
      return false;
  }
}