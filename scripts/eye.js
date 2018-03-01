function Eye() {
  this.pad = 8;

  this.display = function(x,y,size){
    ellipse(x,y,8,8)
    fill(200,235,245,80);
  }
}