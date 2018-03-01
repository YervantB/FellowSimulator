function World() {
    this.kitchen = {
        xmin:0, 
        xmax:500,
        ymin:0,
        tmax:500,
    };
    this.table = {
        xmin: 800,
        xmax: displayWidth,
        ymin: 600,
        ymax: displayHeight,
        width: displayWidth-this.xmin,
        height: displayHeight - this.ymin,
    };
    this.tiles = [];
    this.tileSize = 30;
    this.tileCount = this.kitchen.xmax/this.tileSize;
    this.isFridge;
    this.isObstacle = [];


    this.createKitchen = function(){
        //display with tiles
        let tileX = tileY = 0;
        for(let i = 0; i < 10; i++){
            for(let j = 0; j < 10; j++){
                this.tiles.push({x: tileX, y: tileY, width: this.tileSize, height: this.tileSize})
                tileX += this.tileSize;
            }
            tileY += this.tileSize;
            tileX = 0;
        }
        for(let i = 0; i < this.tiles.length; i++){
            ['8','9','18','19','90','91', '80','81'].indexOf(String(i)) > -1 ? this.tiles[i].type = 'fridge' : 
            ['30','31','40','41','50','51'].indexOf(String(i)) > -1 ? this.tiles[i].type = 'table':
            ['3','13','4','5','6','7','14','15','16','17'].indexOf(String(i)) > -1 ? this.tiles[i].type = 'sink' : this.tiles[i].type = 'floor'
        }
        this.isFridge = [{x: this.tiles[8], y:this.tiles[18], width: this.tileSize*2, height: this.tileSize*2},{x: this.tiles[90], y:this.tiles[91], width: this.tileSize*2, height: this.tileSize*2}];

    }

    this.createTable = function(){

    }
}