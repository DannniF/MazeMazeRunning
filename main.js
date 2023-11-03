import './style.css'
import Phaser from 'phaser'
//size of canvas screen easy access
const sizes = {     
  width: 600,
  height: 900,
}
//chang gravity ,feature not implemented where an item will change gravity 
const gravity = {
  light: 650,
  normal:800,
  heavy: 900,
}
//all our variables 
var player;
var platforms;
var dmgplatforms;
var stars;
var keyW;
var keyQ;
var score = 0
var textScore
var textTime
var remainingTime 
var timedEvent
const menuStartBtn = document.querySelector('#menuStartBtn')
const gameEndMenu = document.querySelector('#gameEndMenu')
const gameWinLoseSpan = document.querySelector('#gameWinLoseSpan')
const gameEndScoreSpan = document.querySelector('#gameEndScoreSpan')

//Function created to create platforms quicker by using a for loop which checks the number we put in the "b"  parameter and keeps creating a new block on the X axis until i has reached the value of b 
function xmultiplat2(x,y,b){
  for(let i = 1; i <= b; i ++){
  platforms.create.x = x 
  x =  platforms.create.x + 64
  platforms.create(x,y,'pixel'); 
 
  }
  //same as above but now creates the row in the Y axis.
}
function ymultiplat2(x,y,b){
  for(let i = 1; i <= b; i ++){
  platforms.create.y = y 
  y =  platforms.create.y + 64
  platforms.create(x,y,'pixel'); 
  
  }
  //same function used to create dmg Platforms , can not damage player but is used so player does not get stuck on the bottom of the map 
}
function dmgMultPlat(x,y,b){
  for(let i = 1; i <= b; i ++){
  dmgplatforms.create.x = x 
  x =  dmgplatforms.create.x + 64
  platforms.create(x,y,'pixel'); 
 
  }
}
// same for loop funciton used to place collectable gems around the map
function xStarGroup(x,y,b,spacing){
  for(let i = 1; i <= b; i ++){
    stars.create.x = x 
    x =  stars.create.x + spacing
    stars.create(x,y,'star'); 
    }
}
function yStarGroup(x,y,b,spacing){
  for(let i = 1; i <= b; i ++){
    stars.create.y = y 
    y =  stars.create.y + spacing
    stars.create(x,y,'star'); 
    }
}


//function which removes a gem on screen and adds 100 to our current score and adds it to our textScore variable which is used later in our code to show the current score near the player when pressing q
function collectStar (player, star)
{
    star.disableBody(true, true);
    score += 100
    textScore.setText('Score:' + score)
}
//These next two functions create our minimap view of the game world , currently only zooms out , but in later versions i want to make it look more like a map on parchment. 
function miniMap(){
    this.minimap =  this.cameras.add(100, 100, 400, 100).setZoom(0.5).setName('mini');
    this.cameras.scrollX = 300;
    this.cameras.scrollY = 300;
    
}
function hidemap(){
  this.minimap = this.cameras.add(100, 100, 400, 100).setZoom(0.5).setName('mini').setVisible(false);

}
// Phasers blueprint to create a game, allows us to extract code onto another javascript document without bringing other code outside our class. 
class MazeMazeRunner extends Phaser.Scene{
  constructor (){
    super("gamescene");
  }
  preload(){
    //background image 
    this.load.image('sky', 'assets/pexels-magda-ehlers-2114014.jpg');
    //rock assets to show buttons player can use 
    this.load.image('rockQ', 'assets/RockQ.png')
    this.load.image('rockW', 'assets/RockW.png')
    this.load.image('rockBig', 'assets/Rock3.png')
    this.load.image('rockBig2', 'assets/Rock4.png')
    //gem img for item pickup  
    this.load.image('star', 'assets/Gem.png');
    //platform box used to create collision 
   this.load.image('pixel', 'assets/platforms/purple.png')
   

// main character sprite sheet 
   this.load.spritesheet('necromancer', 'assets/necromancer2.png',{frameHeight:24,frameWidth:24})
   
//png of whole map since i couldnot get tileset to work currently 
    this.load.image('mapPNG','assets/imageofmap.png')
//background music , temporary until i find a better song or pay for a licence for other music 
    this.load.audio('bgm', 'assets/watermarked_Sam_Barsh_Tell_Me_A_Cribtime_Story_instrumental_chorus_1_00.mp3')
  }
  //where we create our objects that will show up on the screen 
  create(){
    //pauses our game until we reactivate it a funciton below 
    this.scene.pause("gamescene")
    this.bgm = this.sound.add('bgm')
    this.bgm.play()

    //world bounds where player cant cross 
  this.physics.world.setBounds(-2000,-2000,4200,4200); 
  //making platforms a staticGroup so they are not effected by gravity like our character. 
  platforms = this.physics.add.staticGroup();
    //function from above with our parameters 
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
    //platforms that kills player when touched, added at the bottom of the map to prevent players from getting stuck under the map. Does not yet kill player but is a place holder to stop player from getting stuck 
    dmgplatforms= this.physics.add.staticGroup();
    dmgMultPlat(-2800,2200,200)
   //adding our assets in game, map, rocks, background img, and our minimap camera
    this.add.image(400, 400, 'sky').setScale(2);
    this.add.image(400,200, 'mapPNG').setScale(2);
    this.add.image(300,1513, 'rockQ').setScale(1);
    this.add.image(0,1513, 'rockW').setScale(1);
    this.add.image(-500,1485, 'rockBig').setScale(1.2)
    this.add.image(1100,1485, 'rockBig').setScale(1.2)
    this.add.image(200,1495, 'rockBig2').setScale(1);
    this.minimap =  this.cameras.add(0, 0, 600, 1000).setZoom(0.2).setName('mini').setVisible(false);


  
  // player sprite 
    player = this.physics.add.sprite(100,1500, 'necromancer');
    player.setSize(10,17)
    player.setOffset(7,7)
    
    player.setScale(3)
    player.setBounce(0.2)
    player.setCollideWorldBounds(true);
  
   //make a camrea that follows the player ... causing an issue when placing score and time to follow player also... 
   this.followCam = this.cameras.main.startFollow(player, true,) //camera follows player 
  //sprite animations for main character some are not used do to not finding a sprite with all these animations but will leave as placeholders for when i replace the sprite 
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('necromancer',{
        start: 0,
        end: 3,
        frameRate: 1,
      })
    });
    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('necromancer',{
       frameRate: .2,
       start:0,
        end:4,
         repeat: 1
      }),
  });
  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('necromancer',{
    start: 4,
    end: 7,
    frameRate: .2,
    }), 
  });
  this.anims.create({
    key: 'jump',
    frames: this.anims.generateFrameNumbers('necromancer',{
      start: 21,
    end: 23,
    frameRate: 1,
    repeat: 0
    }),
  })
  this.anims.create({
    key: 'wall',
    frames: this.anims.generateFrameNumbers('necromancer',{
      start: 16,
    end: 17,
    frameRate: 1,
    }),
  })

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
        //checks if player colides with platforms ,same with stars , and stars collection
        this.physics.add.collider(player, platforms);
        this.physics.add.collider(stars,platforms);
        this.physics.add.overlap(player, stars, collectStar, null, this);
        //allows us to use the arrow keys as our movement... later versions i will change it to ASWD for movment 
        this.cursors = this.input.keyboard.createCursorKeys()
        //allows the use of W and Q .similar to eventlisenters 
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);


        // creating our score counter which in our update section will be changed to follow the player 
        textScore = this.add.text(-120,11, "Score: 0",{
          font: "30px Amatic SC",
          stroke: 10,
          strokeThickness: 1,
          fill: "#F0F8EA",
          // backgroundColor: "rgb(144,69,214)",
        
        
        }) 
          // creating our time counter which is also will be changed to follow player when Q is pressed 
        textTime = this.add.text(-20,-100, "Remaining Time: 00",{
          font: "25px Amatic SC",
          stroke: 10,
          strokeThickness: 1,
          fill: "#F0F8EA",
          // backgroundColor: "rgb(144,69,214)"
        })
          // this is our countdown timer which will be used in our textTime . Thanks to @lowpolyprincess for the great tutorial 
        timedEvent = this.time.delayedCall(60000,this.gameOver,[], this)
       
     
        
  }
  update(){
    
    remainingTime  = timedEvent.getRemainingSeconds()
    textTime.setText(`Remaining Time: ${Math.round(remainingTime).toString()} sec`)
// our if statments to check what key is being pressed and what to do if it is pressed .
        if(keyW.isDown ){
      this.minimap.setVisible(true);
      player.setVelocityX(0)
      player.setVelocityY(0)
    } else{
      this.minimap.setVisible(false);}
    if(keyQ.isDown ){
      textScore.setVisible(true)
      textTime.setVisible(true)
      textScore.x = player.x -50
      textScore.y = player.y -50
      textTime.x = player.x  -100
     textTime.y = player. y -100
      player.setVelocityY(0)
    }else{
      textScore.setVisible(false)
      textTime.setVisible(false)

    }
    if(this.cursors.left.isDown && keyW.isUp && keyQ.isUp){      
      player.setVelocityX(-360); 
      player.anims.play('left', true);
    } else if (this.cursors.right.isDown && keyW.isUp && keyQ.isUp)
    {
        player.setVelocityX(360);
        player.anims.play('right', true);
    }
    else
    {
        player.setVelocityX(0);
      
    }

    if(this.cursors.up.isDown && player.body.touching.down){
      player.anims.play('jump',true)
      player.setVelocityY(-630);
      repeat: -1
    }
        if (this.cursors.up.isDown && player.body.touching.right )
    {player.setVelocityY(-630);}
    if (this.cursors.up.isDown && player.body.touching.left){
      player.setVelocityY(-630);}
      if (this.cursors.up.isDown && this.cursors.left.isDown && player.body.touching.top){
        player.setVelocityY(-630);}
        if(this.cursors.down.isDown){
          player.setVelocityY(830)
        }
 
  }
// creates our game over screen base code gotten from https://www.youtube.com/watch?v=0qtg-9M3peI&t=676s  
// modified to add another variation if the player goes pass a certain score. 
  gameOver(){
    this.sys.game.destroy(true)
    if(score <= 7500){
      gameEndScoreSpan.textContent =`Final Score: ${score}`
      gameWinLoseSpan.textContent = "Wow that was quick, but can you go quicker....   Refresh Page to Play Again"
    }else if (score >= 1000){
      gameEndScoreSpan.textContent = `Final Score: ${score}`
      gameWinLoseSpan.textContent = "A true Champ Congrats You WIN!!!!!!!    Refresh Page to Play Again"
    }else {
      gameEndScoreSpan.textContent = `Final Score: ${score}`
      gameWinLoseSpan.textContent = "You Lose! Refresh WebPage to Try Again   Refresh Page to Play Again"
    }
    gameEndMenu.style.display="flex"
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
      debug: false
    }
},
  scene: MazeMazeRunner
};
const game = new Phaser.Game(config);

// allows the start button to resume the game which was paused in on line 123
menuStartBtn.addEventListener("click", function(){
  gameMenu.style.display="none"
  game.scene.resume("gamescene")
})