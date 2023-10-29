const sizes = {     //size for config on top for easy access . 
    width: 600,
    height: 900,
  }

function create(){
    let rows = 10;
    let cols = 20;
    let cellSize = 40;
    let mazeGraphics;

    let grid = [];
    let stack = [];

    for(let j=0; j < rows; j++){
        grid[j] = [];
        for(let i = 0; i < cols; i++){
            grid[j][i] = new Cell(i, j, this);
        }
    }

    let current = grid[0][0];
    current.visited = true;
    stack.push(current);

    this.time.addEvent({
        delay:50,
        callback: function(){
            if(stack.length > 0){
                let next = current.checkNeighbors(grid);
                if (next){
                    next.visted = true;
                    stack.push(current);
                } else {
                    current = stack.pop();
                }
            }
        },
            callbackScope: this,
            loop: true
    });

}

class Cell {
    constructor(i, j, scene){
        this.i = i;
        this.j = j;
        this.walls = {
            top: true,
            right: true,
            bottom: true,
            left: true
        };
        this.visited = false;
        this.scene = scene;
    }
    checkNeighbors(grid){
            let neighbors = [];
            let top = grid[this.j -1] && grid [this.j -1][this.i];
            let right = grid[this.j][this.i + 1];
            let bottom = grid[this.j + 1]&& grid[this.j + 1][this.i]
            let left = grid[this.j][this.i - 1];

            if(top && !top.visited) neighbors.push(top);
            if(right && !right.visted)neighbors.push(right);
            if (bottom && !bottom.visted) neighbors.push(bottom);
            if(left && !left.visted) neighbors.push(left);

            if(neighbors.length > 0){
                let r = Phaser.Math.Between(0, neighbors.length -1);
                return neighbors[r];
            } else {
                return undefined;
            }
        }
}

function removeWalls (a,b) {
    let x = a.i - b.i;
    if (x === 1){
        a.walls.left = false;
        b.walls.right = false;
    } else if (x === -1){
        a.walls.right = false;
        b.walls.left = false;
    }

    let y = a.j - b.j;
    if (y === 1){
        a.walls.top = false;
        b.walls.bottom = false;
    } else if (y === -1){
        a.walls.bottom = false;
        b.walls.top = false;
    }
}

console.log("yes")







const config = {
    type: Phaser.WEBGL,
    width: sizes.width,
    height: sizes.height,
    scene: {
        create: create
       
    }
};

let game = new Phaser.Game(config);
