import './style.css'
import Phaser from 'phaser'



//rewriting code to use class Example extends Phaser.Scene which allows us to ...
const sizes = {
  width: 600,
  height: 900,
}
const gravity = {
  light: 100,
  normal:600,
  heavy: 900,
}
var player;
var platforms;
var stars;
var keyW;

function xmultiplat(x,y,b){
 
  for(let i = 1; i <= b; i ++){
  platforms.create.x = x 
  x =  platforms.create.x + 64
  platforms.create(x,y,'xAxis'); 
  console.log('hello')
  
  }

}
function xmultiplat2(x,y,b){
 
  for(let i = 1; i <= b; i ++){
  platforms.create.x = x 
  x =  platforms.create.x + 64
  platforms.create(x,y,'pixel'); 
  console.log('hello')
  
  }

}
function ymultiplat(x,y,b){
 
  for(let i = 1; i <= b; i ++){
  platforms.create.y = y 
  y =  platforms.create.y + 64
  platforms.create(x,y,'yAxis'); 
  console.log('hello')
  
  }
}
function ymultiplat2(x,y,b){
 
  for(let i = 1; i <= b; i ++){
  platforms.create.y = y 
  y =  platforms.create.y + 64
  platforms.create(x,y,'pixel'); 
  console.log('hello')
  
  }
}


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
// function miniMap(){

//     this.cameras.add(100, 100, 400, 100).setZoom(0.5).setName('mini');
//     this.cameras.scrollX = 300;
//     this.cameras.scrollY = 300;
// }
// function hidemap(){
//   this.cameras.add(0, 0, 600, 900,).setZoom(.5).setName('main');


// }
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
    this.load.image('yAxis', 'assets/platforms/yAxisCol.png')
    this.load.image('pixel', 'assets/platforms/pixel2.png')
  


    //character sprites for jumping running and idle animations
    this.load.spritesheet('dude2','assets/Hobbit/pngs/NEWHOBBITSHEET.png',
      {frameWidth: 60, frameHeight: 50} )
    this.load.spritesheet('dude3','assets/Hobbit/pngs/REVERSEDRUN.png',{frameWidth: 60, frameHeight: 50})
    // this.load.spritesheet('dude4','assets/Hobbit/pngs/JUMP.png',{frameWidth: 60, frameHeight: 50})
    this.cameras.add(0, 0, 600, 900,'main').setZoom(1).setName('mini');
    this.load.image('mapPNG','assets/imageofmap.png')

  }
  create(){
    this.add.image(400, 400, 'sky');
    this.physics.world.setBounds(-1500,-1500,3200,3200); 
    // this.matter.world.setBounds(0,0, 3200,600);

    // const map = this.make.tilemap({key: 'mapset'});
    // const tileset = map.addTilesetImage('Ground','tiles')

    this.add.image(400,200, 'mapPNG').setScale(2);
    // let map = this.make.tilemap({ key: 'mapset' });
    // let tileset = map.addTilesetImage('Ground', 'tile');
    // let myLayer = map.createStaticLayer('platform', tileset);

    // myLayer.setCollisionByProperty({ collides: true });
    
    

    //old platforms my delete or may add for movement 
    platforms = this.physics.add.staticGroup();
    // PlatformLocation(400,568, 'ground')
    // .setScale(2).refreshBody();   Does not work with my created function ... figure out how to implement without 
    // PlatformLocation(600, 400, 'ground');
    // PlatformLocation(50, 250, 'ground');
    // PlatformLocation(750, 220, 'ground');
    // PlatformLocation(70,300, 'ground')


    //created small sections of ground to check for collision x-axis and y axis 
    //mainplatform ground level
    
    // xmultiplat(-450,1225, 12)
    // xPlatformLocation(1200,1225, 12)//for spaces which cant be filled with the function above. 
    // xmultiplat(-360,1260, 12)
    // xmultiplat(-360,1295, 12)
    // xmultiplat(-270,1330, 11)
    // xmultiplat(-270,1365, 10)



    // xPlatformLocation(80,890)
    // xPlatformLocation(210,890)
    // xPlatformLocation(340,890)
    // xPlatformLocation(470,890)
    // xPlatformLocation(600,890)
    // xPlatformLocation(730,890)
    // xPlatformLocation(730,890)
    // xPlatformLocation(860,890)
    // xPlatformLocation(910,890)
    // //leftside of mainplatform
    // xPlatformLocation(-50,925)
    // //rightside of mainplatform
    // xPlatformLocation(910,925)
    // xPlatformLocation(890,960)
    // //bottom strip of platform
    // xPlatformLocation(-180,1080)
    // xPlatformLocation(-180,1080)
    // xPlatformLocation(-180,1080)
    // xPlatformLocation(-50,1080)
    // xPlatformLocation(80,1080)
    // xPlatformLocation(210,1080)
    // xPlatformLocation(340,1080)
    // xPlatformLocation(470,1080)
    // xPlatformLocation(600,1080)
    // yPlatformLocation(580,1000)
    // xPlatformLocation(500,970)
    // xPlatformLocation(370,970)
    // xPlatformLocation(240,970)
    // xPlatformLocation(90,970)
    // //maze collision 
    // yPlatformLocation(-200,805)
    // yPlatformLocation(-200,680)
    // yPlatformLocation(-200,680)
    // yPlatformLocation(-200,555)
    // yPlatformLocation(-200,430)
    // yPlatformLocation(-200,305)
    // yPlatformLocation(-200,180)
    // //split
    // xPlatformLocation(-150,120)
    // //split
    // yPlatformLocation(-200,805)
    // yPlatformLocation(-200,680)
    // yPlatformLocation(-200,680)
    // yPlatformLocation(-200,555)
    // yPlatformLocation(-200,430)
    // yPlatformLocation(-200,305)
    // yPlatformLocation(-200,180)
// main platform
    xmultiplat2(-650,1580,34)
    xmultiplat2(-590,1644,33)
    xmultiplat2(-480,1708,31)
    xmultiplat2(-330,1772,28)
    xmultiplat2(700,1836,10)
    xmultiplat2(700,1900,9)
    xmultiplat2(-900,1964,33)
    xmultiplat2(-900,2028,33)
  //maze above x axis 
  xmultiplat2(-470,1260,25)
  xmultiplat2(500,1070,8)
  xmultiplat2(620,870,5)
  xmultiplat2(685,680,4)
  xmultiplat2(820,490,4)

  //maze above y axis
    ymultiplat2(-210,100,15)
    ymultiplat2(-400,30,18)
    ymultiplat2(-600,35,19)
    ymultiplat2(-780,35,23)
    ymultiplat2(-20,100,13)
    ymultiplat2(175,100,13)
    ymultiplat2(370,295,10)
    ymultiplat2(370,1065,2)
    ymultiplat2(620,100,2)
    ymultiplat2(945,-150,6) //a
    // ymultiplat2(1140,-210,22) //b
    ymultiplat2(1140,-150,21)
    ymultiplat2(1330,-150,22)
    ymultiplat2(1520,46,19)
    
    // const platform1 = this.physics.add.image(600,128, 'ground').setImmovable(true).setVelocity(0,50)
    // platform1.body.setAllowGravity(false)
  
    player = this.physics.add.sprite(800,500, 'dude2');    //creates sprite and adds it onto the screen at 100 pxs to  x:100 and y:450
   //changes the size of the sprite character.... but it looks blurry , fix in asperite . 
    this.cameras.main.startFollow(player, true,).setZoom(.25) //camera follows player 
    
 
    player.setBounce(0.2)
    player.setCollideWorldBounds(true);
    
  
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude3'),
      start: 1,
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
    start: 1,
    end: 3,
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'jump',
    frames: this.anims.generateFrameNumbers('dude3'),
    start: 1,
    end: 7,
    frameRate: 30,
    repeat: 1
  })
      
       this.cursors = this.input.keyboard.createCursorKeys()
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
      
  
    //     stars = this.physics.add.group({
    //       key: 'star',
    //       repeat: 11,
    //       setXY: { x: 12, y: 0, stepX: 70 }
    //   });
  
    //   stars.children.iterate(function (child) {
  
    //     child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    
    // });
  
        this.physics.add.collider(player, platforms);
        // this.physics.add.collider(stars,platforms);
  
        // this.physics.add.overlap(player, stars, collectStar, null, this);
        
      
        





  }
  update(){
    // if(keyW.isDown){
    //   miniMap.call(this) 
    //   console.log('MiniMapAdded') 
    // }else {
    //   hidemap.call(this)
    
    // }
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










