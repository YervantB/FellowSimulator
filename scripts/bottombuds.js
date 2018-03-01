function BottomBuds(x, y,col) {
  this.x = x;
  this.y = y;
  this.r = 15;
  this.needsHelp=0;
  this.distance = 10;
  this.color = col;

  this.update = function(){
        if(int(random(10,500))% 90 === 0)
            this.needsHelp += 0.5;
  }
}

