var config = {
    type: Phaser.AUTO,
    width: 384,
    height: 208,
    backgroundColor: '#5c94fc',
    parent: 'gameDiv',
    zoom: 2.5,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 900 }, // will affect our player sprite
            debug: false // change if you need
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
        render: render
    }
};

var game = new Phaser.Game(config);
  
function preload() {
    this.load.tilemapTiledJSON('tilemap', "./assets/tilemap.json");
    this.load.image("blocks", "./assets/ground.png");
    this.load.spritesheet("mario", "./assets/mario.png", { frameWidth: 40, frameHeight: 40 });
    this.load.atlas('player', './assets/marioSprites.png', './assets/mario.json');

    this.time.advancedTiming = true;
}

function create() {
    const map = this.add.tilemap("tilemap");
    const tiles = map.addTilesetImage("ground", "blocks");
    const groundLayer = map.createDynamicLayer("ground", tiles, 0, 0);
    groundLayer.setCollisionByExclusion([-1]);

    this.physics.world.bounds.width = groundLayer.width;
    this.physics.world.bounds.height = groundLayer.height;

    player = this.physics.add.sprite(200, 200, 'player'); 
    //player.setBounce(0.2); // our player will bounce from items
    player.setCollideWorldBounds(true); // don't go out of the map
    //player.body.setAllowDrag(true);
    //player.body.setDrag(700, 0);
    //player.body.setFriction(1, 1);
    this.physics.add.collider(groundLayer, player);

    cursors = this.input.keyboard.createCursorKeys();

    // set bounds so the camera won't go outside the game world
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    // make the camera follow the player
    this.cameras.main.startFollow(player);
    
    
    // Set up speed and force values
    this.xSpeed = 350;
    this.slowRun = 100;
    this.mediumRun = 150;
    this.fastRun = 200;
    this.lowJump = -360;
    this.mediumJump = -400;
    this.highJump = -430;
    this.jumpForce = -250;
    this.totalJumps = 1;
    this.currentJump = 0;

    this.maxSpeed = 200;
    this.acceleration = 5;

    this.jumped = false;
    this.momentum = 0;
}

function update() {

    if (cursors.left.isDown) // if the left arrow key is down
    {
        if(player.body.onFloor()){
            this.momentum++;
        }
        if(this.momentum < 15){
            player.body.velocity.x = -this.slowRun;
        }else if(this.momentum < 50){
            player.body.velocity.x = -this.mediumRun;
        }else{
            player.body.velocity.x = -this.fastRun;
        }
        
    }
    else if (cursors.right.isDown) // if the right arrow key is down
    {
        if(player.body.onFloor()){
            this.momentum++;
        }
        if(this.momentum < 15){
            player.body.velocity.x = this.slowRun;
        }else if(this.momentum < 50){
            player.body.velocity.x = this.mediumRun;
        }else{
            player.body.velocity.x = this.fastRun;
        }
    } else if (!cursors.left.isDown && !cursors.right.isDown) {
        player.body.velocity.x = 0;
        this.momentum = 0;
    }
    if ((cursors.space.isDown || cursors.up.isDown) && player.body.onFloor())
    {
        if(!this.jumped){
            if(this.momentum < 15){
                player.body.setVelocityY(this.lowJump);
            }else if(this.momentum < 50){
                player.body.setVelocityY(this.mediumJump);
            }else{
                player.body.setVelocityY(this.highJump);
            }
            
            this.jumped = true;
        }
    }else if((cursors.space.isUp && cursors.up.isUp)){
        if(this.jumped){
            player.body.setVelocityY(0);
        }
        this.jumped = false;
    }
}

function render(){
    this.debug.text('FPS: ' + this.time.fps || 'FPS: --', 40, 40, "#00ff00");
}