function Player(x, y) {
  this.acceleration = 0.2;
  this.currentSpeedX = 0;
  this.currentSpeedY = 0;
  this.xDirection;
  this.yDirection;
  this.size = 20;
  this.lastDir = 'right';
  this.isRunning;
  this.x = x;
  this.y = y;
  this.r = 15;
  this.hunger = 0;
  this.procrastinate = 0;
  this.computerPos = [x,y];
  this.fridgePos1 = {x: 0, y: 0};
  this.fridgePos2 = {x: 0, y: 0};
  this.position = {x: this.x, y: this.y};
  this.speed = 2;
  this.sweatSize = 2;
  this.eating = false;
  this.score = 0;
  this.time = 0;
  this.temp = random(0.001,0.01);
  this.isDead = false;
  this.isTyping = false;



  // Method to update location
  this.update = function(time,world,typing,ohhimark) {
     this.hunger += 0.009;
     this.procrastinate += 0.01;
     if(int(random(80,1000))% 15 === 0 ) this.eating = false;
     if(this.score > 0)
        this.score -= 0.01*this.sweatSize;
      if(keyIsDown(16)){
          this.isRunning = true;
          this.speed = 3;
     }
     if(!keyIsDown(16)){
         this.isRunning = false;
         this.speed = 1.2;
         this.acceleration = 0.1;
     }
     if(keyIsDown(69)){
        if((this.position.x > this.computerPos[0] && this.position.x < this.computerPos[0]+25)&&(this.position.y > this.computerPos[1] && this.position.y < this.computerPos[1]+25)){
            if(floor(this.procrastinate) > 0){
                this.isTyping = true;
                this.procrastinate -= 0.02;
                this.score += 0.2;
                if(int(this.procrastinate) <= 0)
                this.score -= 0.2;
            }
        }
        if((this.position.x > this.fridgePos1.x && this.position.x < this.fridgePos1.x+25 &&(this.position.y > this.fridgePos1.y && this.position.y < this.fridgePos1.y+25))){
            if(this.hunger > 0 && !this.eating){
                if(!this.eating && this.hunger > 0){
                    this.hunger -= 5;
                    this.eating = true;
                }
        }
        if((this.position.x > this.fridgePos2.x && this.position.x < this.fridgePos2.x+25 &&(this.position.y > this.fridgePos2.y && this.position.y < this.fridgePos2.y+25))){
              if(this.hunger > 0){
                if(!this.eating && this.hunger > 0){
                    this.hunger -= 5;
                    this.eating = true;
                }
                if(this.hunger < 0)
                    this.hunger = 0;
                }
        }
    }}

      if(keyIsDown(LEFT_ARROW))  {
          if(this.xDirection === 'right') this.currentSpeeyX = 0;
          this.xDirection = 'left'; 
          this.lastDir = 'left';
          if(this.position.x - this.size >= 0){
            if(abs(this.currentSpeedX) > this.speed) this.currentSpeedX -= this.acceleration;
            else this.currentSpeedX = this.speed;
            this.position.x -= this.currentSpeedX;
            if(!keyIsDown(UP_ARROW)|| !keyIsDown(DOWN_ARROW)){
                if(this.isRunning) this.sweatSize += 0.02 + this.temp;
                else this.sweatSize += 0.005 + this.temp;
            }
          }
        }
      if(keyIsDown(RIGHT_ARROW))  {
          if(this.xDirection === 'down') this.currentSpeeyX = 0;
          this.xDirection = 'right'; 
          this.lastDir = 'right';
          if((this.position.x + this.size) <= displayWidth){
            if(this.currentSpeedX < this.speed) this.currentSpeedX += this.acceleration;
            else this.currentSpeedX = this.speed;
            this.position.x += this.currentSpeedX;
          if(!keyIsDown(UP_ARROW)|| !keyIsDown(DOWN_ARROW)){
                if(this.isRunning) this.sweatSize += 0.02 + this.temp;
                else this.sweatSize += 0.005 + this.temp;
            }
          }
        }
      if(keyIsDown(UP_ARROW))  {
          if(this.yDirection === 'down') this.currentSpeeyY = 0;
          this.yDirection = 'up'; 
          this.lastDir = 'up';
          if((this.position.y - this.size) >= 0){
            if(abs(this.currentSpeedY) > this.speed) this.currentSpeedY -= this.acceleration;
            else this.currentSpeedY = this.speed;
            this.position.y -= this.currentSpeedY;
            if(this.isRunning) this.sweatSize += 0.02 + this.temp;
            else this.sweatSize += 0.005 + this.temp;
          }
        }
      if(keyIsDown(DOWN_ARROW))  {
          if(this.yDirection === 'up') this.currentSpeeyY = 0;
          this.yDirection = 'down'; 
          this.lastDir = 'down';
          if((this.position.y + this.size) <= displayHeight){
            if(this.currentSpeedY < this.speed) this.currentSpeedY += this.acceleration;
            else this.currentSpeedY = this.speed;
            this.position.y += this.currentSpeedY;
            if(this.isRunning) this.sweatSize += 0.02 + this.temp;
            else this.sweatSize += 0.005 + this.temp;
          }
      }
    if(!keyIsDown(UP_ARROW) && !keyIsDown(DOWN_ARROW)){
        if(!keyIsDown(LEFT_ARROW) && !keyIsDown(RIGHT_ARROW) && this.sweatSize >= 0){
            this.sweatSize -= 0.03;
        }
        this.currentSpeedY = 0;
    }
    if(!keyIsDown(LEFT_ARROW) && !keyIsDown(RIGHT_ARROW)){
        this.currentSpeedX = 0;
    }
    if(!keyIsDown(69)){
        this.isTyping = false;
        this.eating = false;
    }
  }




  this.display = function(){
    var x = this.position.x; var y = this.position.y
    let s = this.size;
    s = this.sweatSize >= 15 ? random(this.size,this.size+20) : this.sweatSize >= 10 ? random(this.size+1,this.size+10) : random(this.size,this.size+2)
    var r = this.sweatSize >= 15 ? random(250,255) : this.sweatSize >= 10  ? random(50,100) : random(20,45);
    fill(r,0,0);
    stroke(255);
    strokeWeight(1);
    ellipse(this.position.x, this.position.y, s,s);

  }
}

