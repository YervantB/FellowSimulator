var show = false;
var player;
var world;
var eye;
var sweat = [];
var shirts = [];
var timer;
var currTime = 0;
var bbuds = [];
var tbuds = [];
var song;
var typeSound;
var ohhimark;
var pp;
var ponger1 = {};
var ponger2 = {};
var tracker = 0;
var eatSound;


function preload(){
  song = loadSound("../assets/ftl.mp3");
  typeSound = loadSound("../assets/typed.mp3");
  ohhimark = loadSound("../assets/ohhimark (1).mp3");
  eatSound = loadSound("../assets/eat.mp3");
}
function setup(){
  background(51);
  createCanvas(displayWidth,displayHeight);
  song.play();
  song.setVolume(.4)
  ohhimark.setVolume(3);
  eatSound.setVolume(3);
  typeSound.setVolume(3);
  timer = 90  ;
  //create world
  world = new World();
  world.createKitchen();   
  
  pp = new Pingpong();
  ponger1.x = pp.x;
  ponger1.y = pp.y-13;
  ponger1.direction = 'right';
  ponger2.x = pp.x+125;
  ponger2.y = pp.y+213;
  ponger2.direction = 'left';

  //create player
  player = new Player(970,855,typeSound);
  var x = 1055; var y = 850;

  //bbuds
  for(var i = 0; i < 6; i++){
    var color = [int(random(255)),int(random(255)),int(random(255))]
    bbuds.push(new BottomBuds(x,y,color));
    x+=85;
  }
  //tbuds
  x = 910; y = 750;
    for(let i = 0; i < 8; i++){
    let color = [int(random(255)),int(random(255)),int(random(255))]
    tbuds.push(new TopBuds(x,y,color));
    x+=85;
  }

  
  //shirt array
  var ex = -300; var why = -50;
  for(var k = 0; k < 3; k++){ 
    shirts.push({x:(ex+(30*(k+1))), y:why, isWorn: false });
  }
}




function draw() {
  
  background(51);
  setFrameRate(80);
  var timeElapsed = millis();
  if(timeElapsed-currTime >= 1250){
    timer -= 1;
 currTime = timeElapsed;
  }
  //continue populating sweat array
  sweat.push({x: player.position.x, y:player.position.y, time: timeElapsed});
  ohhimark.setVolume(3);
  //display shirts
    for(let i = 0; i < shirts.length; i++){
      fill(200, 85, 99);
      stroke(255);
      strokeWeight(2);
      console.log();
      rect(shirts[i].x, shirts[i].y, 30, 30 )
    }
  
  //render kitchen tiles
  for(let i = 0; i < world.tiles.length; i++){
    noStroke();
    if(world.tiles[i].type === 'floor') fill(random(240,255),75,25,90);
    else if(world.tiles[i].type === 'fridge') fill(random(20,25));
    else if(world.tiles[i].type === 'sink') fill(random(195,200));
    else if(world.tiles[i].type === 'table') fill(random(170,180), 120, 100);
    rect(world.tiles[i].x, world.tiles[i].y, world.tileSize, world.tileSize);
  }
  
  //create work tables
  stroke(0)
  fill(random(195,203));
  rect(850,765, 700, 75)
  rect(30, 740, 600, 75 )
  rect(30, 600, 300, 75)
  
  //computers
  let x = 960; 
  for(let i=0; i < 7; i++){
    fill(143,random(190,205),88)
    rect(x,803, 20,20)
    fill(185);
    rect(x+5,828, 10,5)
    x+=85;
}
 x = 900
  for(let i=0; i < 8; i++){
    fill(143,random(190,205),88)
    rect(x,780, 20,20)
    fill(185);
    rect(x+5,770, 10,5)
    x+=85;
}

  //computers
  x = 50; 
  y = 780;
  for(let i=0; i < 7; i++){
    fill(143,88,random(190,205))
    rect(x,y, 20,20)
    fill(185);
    rect(x+5,y+25, 10,5)
    fill(random(50,100),random(200,255),random(50,100));
    ellipse(x+10,y+45,15,15)
    x+=85;
}

  //computers
  x = 90; 
  y = 757;
  for(let i=0; i < 6; i++){
    fill(143,88,random(190,205))
    rect(x,y, 20,20)
    fill(185);
    rect(x+5,y-10, 10,5)
    fill(random(50,100),random(200,255),random(50,100));
    ellipse(x+10,y-30,15,15)
    x+=85;
}

  //computers
  x = 80; 
  y = 620;
  for(let i=0; i < 3; i++){
    fill(143,88,random(190,205))
    rect(x,y, 20,20)
    fill(185);
    rect(x+5,y-10, 10,5)
    x+=85;
}
x = 90;
y = 580;
fill(random(255),random(255),random(255));
ellipse(x+random(-2,2),y+random(-10,5),random(5,15),random(20,30));

  //computers
  x = 260; 
  y = 60;
  fill(143,88,random(190,205),95)
  rect(x,y, 25,25)
  player.fridgePos1.x = x;
  player.fridgePos1.y = y;

  x = 15; 
  y = 215;
  fill(143,88,random(190,205))
  rect(x,y, 25,25)
  player.fridgePos2.x = x;
  player.fridgePos2.y = y;


  //render sweat trail
    for (var i = 0; i < sweat.length; i++) {
    if(timeElapsed - sweat[i].time < 2000){
      fill(0, random(150,200), random(200,250), 100);
      noStroke();
      var offset = player.sweatSize/2;
      rect(sweat[i].x-offset, sweat[i].y-offset, player.sweatSize, player.sweatSize);
      
    }
  }

  //render bbuds
  for(let i = 0; i < bbuds.length; i++){
    bbuds[i].update();
    stroke(0);
      strokeWeight(2);
    fill(bbuds[i].color[0],bbuds[i].color[1],bbuds[i].color[2])
    ellipse(bbuds[i].x+random(-2,2),bbuds[i].y,bbuds[i].r,bbuds[i].r)

    if(bbuds[i].needsHelp >= 10){
      if((player.position.x > bbuds[i].x-15 && player.position.x < bbuds[i].x-15+25 &&(player.position.y+15 > bbuds[i].y && player.position.y < bbuds[i].y+15+25))){
          if(int(random(1,100)) === 10) ohhimark.play();
          ohhimark.setVolume(3);
          player.score += 1;
          bbuds[i].needsHelp -= 0.3;
          if(bbuds[i].needsHelp <= 10)bbuds[i].needsHelp = -20;
      }
      else if(bbuds[i].needsHelp >= 150) player.score -= 100;
      fill(180,random(55,60),140);
      rect(bbuds[i].x-15,bbuds[i].y+15, 25,25);
    }
  }


  //tbuds
  for(let i = 0; i < tbuds.length; i++){
    tbuds[i].update();
    fill(tbuds[i].color[0],tbuds[i].color[1],tbuds[i].color[2])
    ellipse(tbuds[i].x+random(-2,2),tbuds[i].y,tbuds[i].r,tbuds[i].r)

    if(tbuds[i].needsHelp >= 10){
      if((player.position.x > tbuds[i].x-15 && player.position.x < tbuds[i].x-15+25 &&(player.position.y > tbuds[i].y-40 && player.position.y < tbuds[i].y-40+25))){
        if(int(random(1,100)) === 10) ohhimark.play();
          ohhimark.setVolume(3);
          player.score += 1;
          tbuds[i].needsHelp -= 0.1;
          if(tbuds[i].needsHelp <= 10)tbuds[i].needsHelp = int(random(-20,5));
      }
      else if(tbuds[i].needsHelp >= 150) player.score -= 100;
      fill(180,random(55,60),140);
      rect(tbuds[i].x-15,tbuds[i].y-40, 25,25);
    }

    
  }
  fill(47, random(100,112), 66);
  stroke(220);
  strokeWeight(2);
  rect(pp.x,pp.y,125,200)

  stroke(0);
  strokeWeight(2);
  fill(125,125,20);
  let rand = int(random(0,30));
  if(rand=== 10){
    if(ponger1.position === 'left'){
      ponger1.position = 'right';
      ponger1.x++
    }else {
      ponger1.position = 'left';
      ponger1.x--;
    } 
      
  }

  if(rand === 19){
    ponger2.position === 'left' ? ponger2.position = 'right' : ponger2.position = 'left';
  }

  if(ponger1.x < pp.x+125 && ponger1.direction === 'right')ponger1.x++;
  else ponger1.direction = 'left';
  if(ponger1.x > pp.x && ponger1.direction === 'left')ponger1.x--;
  else ponger1.direction = 'right';
  ellipse(ponger1.x,ponger1.y,15,15);

  fill(0,125,125);
  if(ponger2.x < pp.x+125 && ponger2.direction === 'right')ponger2.x++;
  else ponger2.direction = 'left';
  if(ponger2.x > pp.x && ponger2.direction === 'left')ponger2.x--;
  else ponger2.direction = 'right';
  ellipse(ponger2.x,ponger2.y,15,15);


  //render player
  fill(180,random(55,60),140)
  stroke(0);
  strokeWeight(2);
  rect(player.computerPos[0]-10, player.computerPos[1]-10, 25,25)
  player.update(timeElapsed,world);
  player.display();
  if(player.isTyping){
      if(int(random(1,20))===5)typeSound.play();
    }
  if(player.eating) eatSound.play();
  

  noStroke();
  let r; let g; let b;
  if(player.hunger < 10){ r = 50; g=250, b=0}; if(player.hunger > 10){r=150; g=150; b=0; } if(player.hunger > 20){r=250; g=50; b=0; }
  fill(r,g,b)
  textSize(9)
  text(floor(player.hunger), player.position.x - player.size-4, player.position.y+player.size);
  text(floor(player.procrastinate), player.position.x + player.size-2, player.position.y+player.size);
  //render eye to specify direction
    strokeWeight(5);
    if(player.lastDir === 'right') ellipse(player.position.x+8, player.position.y, 10)
    if(player.lastDir === 'left') ellipse(player.position.x-8, player.position.y, 10)
    if(player.lastDir === 'up') ellipse(player.position.x, player.position.y-8, 10)
    if(player.lastDir === 'down') ellipse(player.position.x, player.position.y+8, 10) 


  //screen statistics
  textSize(15);
  var state;
  noStroke();
  //sweat level value associations
  if(player.sweatSize >= 20) state = "Moistmaster"
  else if(player.sweatSize >= 15) state = "So hawt!! Carefule"
  else if(player.sweatSize >= 10) state = "very very excercise!"
  else if(player.sweatSize >= 5)state = "breaking a sweat"
  else if(player.sweatSize >= -1) state = "oardiniary peepole"
  text("sweat level: " + int(player.sweatSize) + " - " + state, 20, displayHeight-20);
  fill(255, 25, 25);
  stroke(0);
  textSize(15);
  text("score: " + int(player.score), displayWidth/2, 35);
  text("time: " + int(timer), displayWidth/2+1, 55);

  //temperature associations
  var temp;
  if(player.temp >= 0.009) temp = " Sun Power Level =  1 million power (90+ F)"
  else if(player.temp >= 0.007) temp = "OH EM GEE, LETS GO TAN GURRRLLLL (80 - 90 F)"
  else if(player.temp >= 0.005) temp = "oh em gee, it's soo cold, its like 79 (60 - 80 F)"
  else if(player.temp >= 0.003)temp = "breeeeezzyyy (50-60 F)"
  else if(player.temp >= 0.001) temp = "may the sun never rise again (below 50 F)"

  text("temperature: " + temp, 20, displayHeight-40);


  
  if(timer === 0){
  if(player.score >= 500)
     alert("YOU HELPED THE MANY PEOPLE AND U LEARNDED A LOT");
  else if(player.score >= 250)
     alert("YOU TRIEDED, BUT YOU FAILDED SO W/E");
  else if(player.score >= 0)
     alert("IF CAN'T HELP, THAN GO MAKE READ BOOK WILL MAKE U SMARTER INCRASE IQ, NICE TRY GAME OVER");
  }
  if(player.hunger >= 40){
    alert("YOU NEED TO EAT MAIN, U DEAD 2 LATE")
  }
 if(player.sweatSize >= 30){
   alert("You were too hot for this world. RIP.")
}
}

 
function mouseReleased() {
    var fs = fullscreen();
    fullscreen(!fs);
}

 
function windowResized() {
  resizeCanvas(displayWidth, displayHeight);
  cursor();  
  showing = false;
  background(0);
}

