var config = {
    type: Phaser.AUTO,
    width: 500,
    height: 432,
    backgroundColor: '#5c94fc',
    parent: 'gameDiv',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 }, // will affect our player sprite
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
    // this.load.spritesheet('tiles', 'https://res.cloudinary.com/harsay/image/upload/v1464614984/tiles_dctsfk.png', 16, 16);
    // this.load.spritesheet('goomba', 'https://res.cloudinary.com/harsay/image/upload/v1464614984/goomba_nmbtds.png', 16, 16);
    // this.load.spritesheet('mario', 'https://res.cloudinary.com/harsay/image/upload/v1464614984/mario_wjlfy5.png', 16, 16);
    // this.load.spritesheet('coin', 'https://res.cloudinary.com/harsay/image/upload/v1464614984/coin_iormvy.png', 16, 16);
    // this.load.spritesheet('sss', './assets/ground.png', 16, 16);
    // this.load.tilemap('level', 'https://api.myjson.com/bins/3kk2g', null, Phaser.Tilemap.TILED_JSON);
    //game.load.tilemap('tilemap', "./assets/tilemap.json", null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemapTiledJSON('tilemap', "./assets/tilemap.json");
    this.load.image("blocks", "./assets/ground.png");
    this.load.spritesheet("mario", "./assets/mario.png", { frameWidth: 40, frameHeight: 40 });
    this.load.atlas('player', './assets/marioSprites.png', './assets/mario.json');
}

function create() {

    const map = this.add.tilemap("tilemap");
    const tiles = map.addTilesetImage("ground", "blocks");
    const groundLayer = map.createDynamicLayer("ground", tiles, 0, 0);
    groundLayer.setCollisionByExclusion([-1]);

    this.physics.world.bounds.width = groundLayer.width;
    this.physics.world.bounds.height = groundLayer.height;

    player = this.physics.add.sprite(200, 200, 'player'); 
    player.setBounce(0.2); // our player will bounce from items
    player.setCollideWorldBounds(true); // don't go out of the map
    this.physics.add.collider(groundLayer, player);

    cursors = this.input.keyboard.createCursorKeys();

    // set bounds so the camera won't go outside the game world
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    // make the camera follow the player
    this.cameras.main.startFollow(player);
    
    //this.physics.world.bounds.width = groundLayer.width;
    //this.physics.world.bounds.height = groundLayer.height;
    // Phaser.Canvas.setImageRenderingCrisp(game.canvas)
    // game.scale.pageAlignHorizontally = true;
    // game.scale.pageAlignVertically = true
    // game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    // game.physics.startSystem(Phaser.Physics.ARCADE);
    // game.time.advancedTiming = true;

    // game.stage.backgroundColor = '#5c94fc';

    // map = game.add.tilemap('level');
    // map.addTilesetImage('tiles', 'tiles');
    // map.setCollisionBetween(3, 12, true, 'solid');

    // //map = game.add.tilemap('tilemap');
    // //map.addTilesetImage('ground', 'sss');


    // map.createLayer('background');

    // layer = map.createLayer('solid');
    // layer.resizeWorld();

    // coins = game.add.group();
    // coins.enableBody = true;
    // map.createFromTiles(2, null, 'coin', 'stuff', coins);
    // coins.callAll('animations.add', 'animations', 'spin', [0, 0, 1, 2], 3, true);
    // coins.callAll('animations.play', 'animations', 'spin');

    // goombas = game.add.group();
    // goombas.enableBody = true;
    // map.createFromTiles(1, null, 'goomba', 'stuff', goombas);
    // goombas.callAll('animations.add', 'animations', 'walk', [0, 1], 2, true);
    // goombas.callAll('animations.play', 'animations', 'walk');
    // goombas.setAll('body.bounce.x', 1);
    // goombas.setAll('body.velocity.x', -20);
    // goombas.setAll('body.gravity.y', 500);

    //player = this.add.sprite(16, 43, 'mario');
    // game.physics.arcade.enable(player);
    //player.body.accelGround = 370;
    // player.body.collideWorldBounds = true;
    // player.animations.add('walkRight', [1, 2, 3], 10, true);
    // player.animations.add('walkLeft', [8, 9, 10], 10, true);
    // player.goesRight = true;

    // game.camera.follow(player);

    // cursors = game.input.keyboard.createCursorKeys();
}

function update() {

    if (cursors.left.isDown) // if the left arrow key is down
    {
        player.body.setVelocityX(-200); // move left
    }
    else if (cursors.right.isDown) // if the right arrow key is down
    {
        player.body.setVelocityX(200); // move right
    }
    if ((cursors.space.isDown || cursors.up.isDown) && player.body.onFloor())
    {
        player.body.setVelocityY(-500); // jump up
    }
    // game.physics.arcade.collide(player, layer);
    // game.physics.arcade.collide(goombas, layer);
    // game.physics.arcade.overlap(player, goombas, goombaOverlap);
    // game.physics.arcade.overlap(player, coins, coinOverlap);

    // if (player.body.enable) {
    //     player.body.velocity.x = 0;
    //     if (cursors.left.isDown) {
    //     player.body.velocity.x = -90;
    //     player.animations.play('walkLeft');
    //     player.goesRight = false;
    //     } else if (cursors.right.isDown) {
    //     player.body.velocity.x = 90;
    //     player.animations.play('walkRight');
    //     player.goesRight = true;
    //     } else {
    //     player.animations.stop();
    //     if (player.goesRight) player.frame = 0;
    //     else player.frame = 7;
    //     }

    //     if (cursors.up.isDown && player.body.onFloor()) {
    //     player.body.velocity.y = -190;
    //     player.animations.stop();
    //     }

    //     if (player.body.velocity.y != 0) {
    //     if (player.goesRight) player.frame = 5;
    //     else player.frame = 12;
    //     }
    // }
}

function render(){
    this.debug.text(game.time.fps, 2, 14, "#00ff00");
}

function coinOverlap(player, coin) {
    coin.kill();
}

function goombaOverlap(player, goomba) {
    if (player.body.touching.down) {
        goomba.animations.stop();
        goomba.frame = 2;
        goomba.body.enable = false;
        player.body.velocity.y = -80;
        game.time.events.add(Phaser.Timer.SECOND, function() {
        goomba.kill();
        });
    } else {
        player.frame = 6;
        player.body.enable = false;
        player.animations.stop();
        game.time.events.add(Phaser.Timer.SECOND * 3, function() {
        game.paused = true;
        });
    }
}