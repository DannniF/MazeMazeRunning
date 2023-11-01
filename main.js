import './style.css'
import Phaser from 'phaser'



//rewriting code to use class Example extends Phaser.Scene which allows us to ...
const sizes = {
  width: 600,
  height: 900,
}
const gravity = {
  light: 400,
  normal:600,
  heavy: 900,
}
var player;
var platforms;
var stars;
var keyW;



function PlatformLocation(x,y,z) {
  platforms.create(x,y,z);
}
function xPlatformLocation(x,y) {
  platforms.create(x,y, 'xAxis');
}
function yPlatformLocation(x,y) {
  platforms.create(x,y,'yAxis');
}

function collectStar (player, star)
{
    star.disableBody(true, true);
}
function miniMap(){

    this.cameras.add(100, 100, 400, 100).setZoom(0.5).setName('mini');
    this.cameras.scrollX = 300;
    this.cameras.scrollY = 300;
}
function hidemap(){
  this.cameras.add(0, 0, 600, 900,).setZoom(.3).setName('main');


}
class MazeMazeRunner extends Phaser.Scene{
  constructor (){
    super();
  }
  preload(){
    //background image 
    this.load.image('sky', 'assets/pexels-magda-ehlers-2114014.jpg');
    //old platform image 
    this.load.image('ground', 'assets/platform.png');
    //star pickup image 
    this.load.image('star', 'assets/star.png');
    //not used asset 
    this.load.image('bomb', 'assets/bomb.png');
    //image tilemap and JSON file 
    this.load.tilemapTiledJSON('mapset','assets/DemoMap.json') //this is causing issues 
    this.load.image('tile','assets/Tileset.png') //this is working becuase it shows when created 
    this.load.image('mainstage', 'assets/platforms/MainStageTop.png')
    this.load.image('xAxis', 'assets/platforms/xAxisCol.png')
    this.load.image('xAxis', 'assets/platforms/yAxisCol.png')
  


    //character sprites for jumping running and idle animations
    this.load.spritesheet('dude2','assets/Hobbit/pngs/NEWHOBBITSHEET.png',
      {frameWidth: 60, frameHeight: 50} )
    this.load.spritesheet('dude3','assets/Hobbit/pngs/REVERSEDRUN.png',{frameWidth: 60, frameHeight: 50})
    this.load.spritesheet('dude4','assets/Hobbit/pngs/JUMP.png',{frameWidth: 60, frameHeight: 50})
    this.cameras.add(0, 0, 600, 900,'main').setZoom(1).setName('mini');
    this.load.image('mapPNG','assets/imageofmap.png')

  }
  create(){
    this.add.image(400, 400, 'sky');
    this.physics.world.setBounds(-400,0,2200,1200); 
    // this.matter.world.setBounds(0,0, 3200,600);

    // const map = this.make.tilemap({key: 'mapset'});
    // const tileset = map.addTilesetImage('Ground','tiles')

    this.add.image(400,200, 'mapPNG');
    // let map = this.make.tilemap({ key: 'mapset' });
    // let tileset = map.addTilesetImage('Ground', 'tile');
    // let myLayer = map.createStaticLayer('platform', tileset);

    // myLayer.setCollisionByProperty({ collides: true });
    
    

    //old platforms my delete or may add for movement 
    platforms = this.physics.add.staticGroup();
    PlatformLocation(400,568, 'ground')
    // .setScale(2).refreshBody();   Does not work with my created function ... figure out how to implement without 
    // PlatformLocation(600, 400, 'ground');
    // PlatformLocation(50, 250, 'ground');
    // PlatformLocation(750, 220, 'ground');
    // PlatformLocation(70,300, 'ground')
    
    const platform1 = this.physics.add.image(600,128, 'ground').setImmovable(true).setVelocity(0,50)
    platform1.body.setAllowGravity(false)
  
    player = this.physics.add.sprite(100,450, 'dude2');    //creates sprite and adds it onto the screen at 100 pxs to  x:100 and y:450
   //changes the size of the sprite character.... but it looks blurry , fix in asperite . 
    this.cameras.main.startFollow(player, true,) //camera follows player 
    
 
    player.setBounce(0.2)
    player.setCollideWorldBounds(true);
    
  
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude2'),
      start: 0,
      end: 3,
      frameRate: 10,
      repeate: -1
    });
  
    this.anims.create({
      key: 'turn',
      frames: [ { key: 'dude2', frame: 4 } ],
      frameRate: 20
  });
  
  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('dude3'),
    start: 0,
    end: 3,
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'jump',
    frames: this.anims.generateFrameNumbers('dude4'),
    start: 0,
    end: 7,
    frameRate: 30,
    repeat: 1
  })
      
       this.cursors = this.input.keyboard.createCursorKeys()
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
      
  
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
  update(){
    if(keyW.isDown){
      miniMap.call(this) 
      console.log('MiniMapAdded') 
    }else {
      hidemap.call(this)
    
    }
    if (this.cursors.left.isDown)
    {
      player.setVelocityX(-160); 
      player.anims.play('left', true);
    }
    else if (this.cursors.right.isDown)
    {
        player.setVelocityX(160);
    
        player.anims.play('right', true);
    }
    else
    {
        player.setVelocityX(0);
    
        player.anims.play('turn');
    }
    
    if (this.cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-330);
    }
    if (this.cursors.up.isDown && player.body.touching.right){
        player.setVelocityY(-330);
    
    }
    
    if (this.cursors.up.isDown && player.body.touching.left){
      player.setVelocityY(-330);
    
    }
      this.cameras.main.startFollow(player, true,)
  }
}

const config = {
  type: Phaser.WEBGL,
  width: sizes.width,
  height:sizes.height,
  canvas:gameCanvas,
physics: {
  default:"arcade",
    arcade:{
      gravity:{y:gravity.light},
      debug: true
    }
},
  scene: MazeMazeRunner
};
const game = new Phaser.Game(config);































//Size of the screen , easy access
// const sizes = {   
//   width:800,
//   height:600,
// }
//Speed of Falling Physcis variable created to be called within config
// const speedDown = 500 
//config sets size of game and type of physics 
// var config = {
//   type: Phaser.WEBGL,
//   width: sizes.width,
//   height:sizes.height,
// canvas:gameCanvas,
// physics: {
//   default:"arcade",
//     arcade:{
//       gravity:{y:speedDown},
//       debug: true
//     }
// },

//   scene: {
//     preload: preload,
//     create: create,
//     update: update
//   }
// };
//our variables delcared 
// var player;
// var platforms;
// var cursors;
// var stars;



//Where our images, sprites, and object images will be placed
// function preload()
// {
//   this.load.image('sky', 'assets/pexels-magda-ehlers-2114014.jpg');
//   this.load.image('ground', 'assets/platform.png');
//   this.load.image('star', 'assets/star.png');
//   this.load.image('bomb', 'assets/bomb.png');
//   this.load.spritesheet('dude', 
//       'assets/dude.png',
//       { frameWidth: 32, frameHeight: 48 }
//   );
// }
//function which creates platforms with just an x and y pixel count. 
// function PlatformLocation(x,y){
//   platforms.create(x,y, 'ground');

// }
//checks if player and star is coliding
// function collectStar (player, star)
// {
//     star.disableBody(true, true);
// }
//function where we create our objects giving them locations , physics, static bodies, properties , animations 
// function create(){
//   this.add.image(3200, 400, 'sky');
 
//   // this.matter.world.setBounds(0,0, 3200,600);
//   this.minimap = this.cameras.add(200, 10, 400, 100).setZoom(0.2).setName('mini');
//   this.minimap.setBackgroundColor(0x002244);
//   this.minimap.scrollX = 1600;
//   this.minimap.scrollY = 300;

//   platforms = this.physics.add.staticGroup();
//   platforms.create(400,568, 'ground').setScale(2).refreshBody();
//   platforms.create(600, 400, 'ground');
//   platforms.create(50, 250, 'ground');
//   platforms.create(750, 220, 'ground');
//   PlatformLocation(70,300)

//   player = this.physics.add.sprite(100,450, 'dude');    //creates sprite and adds it onto the screen at 100 pxs to  x:100 and y:450

//   player.setBounce(0.2)
//   player.setCollideWorldBounds(true);

//   this.anims.create({
//     key: 'left',
//     frames: this.anims.generateFrameNumbers('dude', {start: 0, end: 3}),
//     frameRate: 10,
//     repeate: -1
//   });

//   this.anims.create({
//     key: 'turn',
//     frames: [ { key: 'dude', frame: 4 } ],
//     frameRate: 20
// });

// this.anims.create({
//   key: 'right',
//   frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
//   frameRate: 10,
//   repeat: -1

// });
    
//       cursors = this.input.keyboard.createCursorKeys()

//       stars = this.physics.add.group({
//         key: 'star',
//         repeat: 11,
//         setXY: { x: 12, y: 0, stepX: 70 }
//     });

//     stars.children.iterate(function (child) {

//       child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
  
//   });

//       this.physics.add.collider(player, platforms);
//       this.physics.add.collider(stars,platforms);

//       this.physics.add.overlap(player, stars, collectStar, null, this);
// }
// function where we create eventliseners to check if buttons are pressed with if and else statements 
// function update(){
//   if (cursors.left.isDown)
// {
//     player.setVelocityX(-160);

//     player.anims.play('left', true);
// }
// else if (cursors.right.isDown)
// {
//     player.setVelocityX(160);

//     player.anims.play('right', true);
// }
// else
// {
//     player.setVelocityX(0);

//     player.anims.play('turn');
// }

// if (cursors.up.isDown && player.body.touching.down)
// {
//     player.setVelocityY(-330);
// }
// if (cursors.up.isDown && player.body.touching.right){
//     player.setVelocityY(-330);

// }

// if (cursors.up.isDown && player.body.touching.left){
//   player.setVelocityY(-330);

// }

// }



// const game = new Phaser.Game(config);

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










