import './style.css'
import Phaser from 'phaser'

const sizes = {
  width: 600,
  height: 900,
}
const gravity = {
  light: 650,
  normal:600,
  heavy: 900,
}
var player;
var platforms;
var dmgplatforms;
var stars;
var stars2;
var keyW; //may not include map in final game due to lag build up, but i think the culptret is the constant checking of else if . 


function xmultiplat2(x,y,b){
  for(let i = 1; i <= b; i ++){
  platforms.create.x = x 
  x =  platforms.create.x + 64
  platforms.create(x,y,'pixel'); 
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
function dmgMultPlat(x,y,b){
  for(let i = 1; i <= b; i ++){
  dmgplatforms.create.x = x 
  x =  dmgplatforms.create.x + 64
  platforms.create(x,y,'pixel'); 
  console.log('hello')
  }
}
// function xStarGroup(x,y,b){
//   this.physics.add.staticGroup({
//   key: 'star',
//   repeat: 20,
//   setXY: { x: 12, y: 1400, stepX: 100 }
// });
// }

function xStarGroup(x,y,b,spacing){
  for(let i = 1; i <= b; i ++){
    stars.create.x = x 
    x =  stars.create.x + spacing
    stars.create(x,y,'star'); 
    console.log('hello')
    }
}
function yStarGroup(x,y,b,spacing){
  for(let i = 1; i <= b; i ++){
    stars.create.y = y 
    y =  stars.create.y + spacing
    stars.create(x,y,'star'); 
    console.log('hello')
    }
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
    //star pickup image 
    this.load.image('star', 'assets/star.png');
    //not used asset 
    this.load.image('bomb', 'assets/bomb.png');
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
  this.add.image(400, 400, 'sky').setScale(2);
  this.physics.world.setBounds(-2000,-2000,4200,4200); 
  platforms = this.physics.add.staticGroup();
    //main spawn platform
    xmultiplat2(-650,1580,34)
    xmultiplat2(-590,1644,33)
    xmultiplat2(-480,1708,31)
    xmultiplat2(-330,1772,28)
    xmultiplat2(700,1836,10)
    xmultiplat2(700,1900,9)
    xmultiplat2(-900,1964,33)
    xmultiplat2(-900,2028,33)
  //maze above: all x-axis patforms
  xmultiplat2(-470,1260,25)
  xmultiplat2(500,1070,8)
  xmultiplat2(620,870,5)
  xmultiplat2(685,680,4)
  xmultiplat2(820,490,4)
  xmultiplat2(310,300,10)
  xmultiplat2(110,110,9)
  xmultiplat2(110,-150,9)
  xmultiplat2(880,-150,4)
  xmultiplat2(1265,-150,6)
  xmultiplat2(-464,-150,7)
  xmultiplat2(-464,-730,7)
  xmultiplat2(560,-730,5)
   xmultiplat2(-464,-920,7)
   xmultiplat2(-464,-1300,7)
  xmultiplat2(-850,-150,4)
  xmultiplat2(-855,35,4)
  xmultiplat2(-275,100,4)
  xmultiplat2(110,-345,21)
  xmultiplat2(110,-535,21)
  xmultiplat2(110,-1115,14)
  xmultiplat2(-850,-730,3)
  xmultiplat2(-850,-410,7)
  xmultiplat2(110,-1500,10)
  xmultiplat2(-910,-1690,40)
  xmultiplat2(880,-1500,9)
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
    ymultiplat2(945,-150,6) 
    ymultiplat2(1140,-150,21)
    ymultiplat2(1330,-150,22)
    ymultiplat2(1520,46,19)
    ymultiplat2(750,-215,5) 
    ymultiplat2(495,-345,2)
    ymultiplat2(-790,-410,3)
    ymultiplat2(-850,-1690,20)
    ymultiplat2(-590,-1560,13)
    ymultiplat2(-400,-1300,1)
    ymultiplat2(-15,-1300,5)
    ymultiplat2(-400,-1050,1)
    ymultiplat2(-340,-474,4)
    ymultiplat2(-15,-730,8)
    ymultiplat2(174,-1500,9)
    ymultiplat2(174,-790,3)
    ymultiplat2(620,-1115,6)
    ymultiplat2(1070,-1500,14)
    ymultiplat2(1455,-1500,9)
    ymultiplat2(1455,-790,3)
    ymultiplat2(1650,-1690,23)
    this.add.image(400,200, 'mapPNG').setScale(2);

    dmgplatforms= this.physics.add.staticGroup();
    dmgMultPlat(-2800,2200,200)
  
    player = this.physics.add.sprite(100,1520, 'dude2');
    player.setBounce(0.2)
    player.setCollideWorldBounds(true);
    this.cameras.main.startFollow(player, true,).setZoom(.2) //camera follows player 
    
  //sprite animations for main character 
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


  
    // stars2 = this.physics.add.image(0,0, "stars").setOrigin(0,0)
    // this.stars2.setMaxVelocity(4, speedDown);
 
    //stars around the map 
    stars = this.physics.add.staticGroup()
      xStarGroup(-600,1400,20,100)
      xStarGroup(-550,1500,20,100)
      xStarGroup(-930,-1790,33,80)
      xStarGroup(-850,-1600,28,80)
      xStarGroup(-850,-500,6,80)
      xStarGroup(-800,-350,5,80)
      xStarGroup(-800,-250,5,80)
      xStarGroup(100,-440,17,80)
      xStarGroup(100,-440,17,80)
      xStarGroup(140,-240,14,100)
      xStarGroup(140,-640,8,100)
      xStarGroup(140,-740,4,100)
      xStarGroup(140,-840,4,100)
      xStarGroup(140,-940,4,100)
      xStarGroup(140,-1040,4,100)
      xStarGroup(140,-1200,8,100)
      xStarGroup(140,-1300,8,100)
      xStarGroup(-430,1200,10,145)
      xStarGroup(-430,1150,10,145)
      xStarGroup(500,1000,8,64)
      xStarGroup(600,800,5,64)
      xStarGroup(700,600,4,64)
      xStarGroup(280,190,9,64)
      xStarGroup(180,0,7,64)
      xStarGroup(-900,1900,16,100)
      yStarGroup(-700,30,20,64)
      yStarGroup(-500,30,18,64)
      yStarGroup(-300,30,15,64)
      yStarGroup(-100,100,12,64)
      yStarGroup(80,100,12,64)
      yStarGroup(260,130,11,64)
      yStarGroup(460,330,8,64)
      yStarGroup(1050,-100,7,64)
      yStarGroup(1230,-230,19,80)
      yStarGroup(1430,-150,18,80)
      yStarGroup(1630,-150,18,80)
      yStarGroup(1730,-1750,20,80)
      yStarGroup(1560,-1700,16,80)
      yStarGroup(1360,-1500,11,80)
      yStarGroup(1260,-1500,11,80)
      yStarGroup(1160,-1500,11,80)
      yStarGroup(80,-1570,21,80)
      yStarGroup(-500,-1570,11,80)
      yStarGroup(-770,-1590,10,80)
      yStarGroup(-670,-1590,10,80)
      yStarGroup(-930,-1790,20,80)
      yStarGroup(-100,-730,6,80)
      yStarGroup(-200,-730,6,80)
      yStarGroup(-100,-1300,4,80)
      yStarGroup(-200,-1300,4,80)
      yStarGroup(-300,-1300,4,80)
   
        this.physics.add.collider(player, platforms);
        this.physics.add.collider(stars,platforms);
        this.physics.add.overlap(player, stars, collectStar, null, this);

        this.cursors = this.input.keyboard.createCursorKeys()
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        
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
      player.setVelocityX(-360); 
      player.anims.play('left', true);
    }
    else if (this.cursors.right.isDown)
    {
        player.setVelocityX(360);
    
        player.anims.play('right', true);
    }
    else
    {
        player.setVelocityX(0);
        player.anims.play('turn');
    }
    if (this.cursors.up.isDown && player.body.touching.down)
    {   player.setVelocityY(-630);}
    if (this.cursors.up.isDown && player.body.touching.right)
    {player.setVelocityY(-630);}
    if (this.cursors.up.isDown && player.body.touching.left){
      player.setVelocityY(-630);}

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