import './style.css'
import Phaser from 'phaser'

const sizes = {
  width:700,
  height:600,
}

const speedDown = 300

var config = {
  type: Phaser.WEBGL,
  width: sizes.width,
  height:sizes.height,
canvas:gameCanvas,
physics: {
  default:"arcade",
    arcade:{
      gravity:{y:speedDown},
      debug: true
    }
},

  scene: {
    preload: preload,
    create: create,
    update: update
  }




};

var player;
var platforms;
var cursors;
var stars;
var game = new Phaser.Game(config);

function preload(){
  this.load.image('sky', 'assets/sky.png');
  this.load.image('ground', 'assets/platform.png');
  this.load.image('star', 'assets/star.png');
  this.load.image('bomb', 'assets/bomb.png');
  this.load.spritesheet('dude', 
      'assets/dude.png',
      { frameWidth: 32, frameHeight: 48 }
  );
}
 


function create(){
  this.add.image(400, 300, 'sky');
  this.add.image(400, 300, 'star');

  platforms = this.physics.add.staticGroup();
  platforms.create(400,568, 'ground').setScale(2).refreshBody();

  platforms.create(600, 400, 'ground');
  platforms.create(50, 250, 'ground');
  platforms.create(750, 220, 'ground');

  player = this.physics.add.sprite(100,450, 'dude');

  player.setBounce(0.2)
  player.setCollideWorldBounds(true);

  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('dude', {start: 0, end: 3}),
    frameRate: 10,
    repeate: -1
  });

  this.anims.create({
    key: 'turn',
    frames: [ { key: 'dude', frame: 4 } ],
    frameRate: 20
});

this.anims.create({
  key: 'right',
  frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
  frameRate: 10,
  repeat: -1

});
    
      cursors = this.input.keyboard.createCursorKeys()

      stars = this.physics.add.group({
        key: 'star',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    });

    stars.children.iterate(function (child) {

      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
  
  });

      this.physics.add.collider(player, platforms);
      this.physics.add.collider(stars,platforms);

      this.physics.add.overlap(player, stars, collectStar, null, this);
}

function update(){
  if (cursors.left.isDown)
{
    player.setVelocityX(-160);

    player.anims.play('left', true);
}
else if (cursors.right.isDown)
{
    player.setVelocityX(160);

    player.anims.play('right', true);
}
else
{
    player.setVelocityX(0);

    player.anims.play('turn');
}

if (cursors.up.isDown && player.body.touching.down)
{
    player.setVelocityY(-330);
}
if (cursors.up.isDown && player.body.touching.right){
    player.setVelocityY(-330);

}

if (cursors.up.isDown && player.body.touching.left){
  player.setVelocityY(-330);

}

}
function collectStar (player, star)
{
    star.disableBody(true, true);
}


// const sizes = {
//   width:500,
//   height:350,
// }

// const speedDown =300

// class GameScene extends Phaser.Scene{
//   constructor(){
//     super("scene-game")
//   }


// //  preloads all code in here before the game starts
//   preload(){
//     this.load.image('sky','assets/sky.png');
//     this.load.image('ground', 'assets/platform.png');
//     this.load.image('star', 'assets/star.png');
//     this.load.image('bomb', 'assets/bomb.png');
//     this.load.spritesheet('dude', 'assets/dude.png',{frameWidth: 32, frameHeight: 48});

//   }
//   // acept our loaded assets hand handle them
//    create(){
//       this.add.image(400, 300, 'sky');
//   }
// // runs continuous
//   update(){


//   }
// }

// const config = {
//   type: Phaser.WEBGL,
//   width:sizes.width,
//   height:sizes.height,
//  canvas:gameCanvas,
//  physics:{
//   default:"arcade",
//   arcade:{
//     gravity:{y:speedDown},
//     debug:true
//   }
//  },
//  scene:[GameScene]
// }

// const game = new Phaser.Game(config)










