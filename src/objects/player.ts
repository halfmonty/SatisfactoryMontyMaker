export class Player extends Phaser.GameObjects.Sprite {
    private currentScene: Phaser.Scene;
    private acceleration: number;
    private isJumping: boolean;

    
    // input
    private keys: Map<string, Phaser.Input.Keyboard.Key>;

    public getKeys(): Map<string, Phaser.Input.Keyboard.Key> {
        return this.keys;
    }

    constructor(params){
        super(params.scene, params.x, params.y, params.key, params.frame);

        this.currentScene = params.scene;
        this.initSprite();
        this.currentScene.add.existing(this);

        this.currentScene.anims.create({
            key: 'runRight',
            frames: [{ key: 'player', frame: 'mario_05'}, { key: 'player', frame: 'mario_08'}],
            frameRate: 10,
            repeat: -1,
        });
        
    }

    private initSprite() {
        //variables
        this.acceleration = 1000;
        this.isJumping = false;
        this.setFrame('mario_05');
        //this.setTexture('player', 'mario_05');

        // sprite
        this.setOrigin(0.5, 0.5);
        this.setFlipX(false);

        // input
        this.keys = new Map([
            ["LEFT", this.addKey("LEFT")],
            ["RIGHT", this.addKey("RIGHT")],
            ["DOWN", this.addKey("DOWN")],
            ["JUMP", this.addKey("SPACE")],
            ["JUMP2", this.addKey("UP")]
        ]);

        //physics
        this.currentScene.physics.world.enable(this);
        this.body.maxVelocity.x = 400;
        this.body.maxVelocity.y = 800;
    }

    private addKey(key: string): Phaser.Input.Keyboard.Key {
        return this.currentScene.input.keyboard.addKey(key);
    }

    update(): void{
        this.handleInput();
        this.handleAnimations();
    }

    private handleInput(){

        //evaluate if player is on ground
        if(this.body.onFloor() ||
            this.body.touching.down ||
            this.body.blocked.down) {
            this.isJumping = false;
        }

        // Left and Right Movement
        if(this.keys.get("RIGHT").isDown){
            if(this.body.blocked.right){  
                this.body.velocity.x = 0;
            }else {
                this.body.setAccelerationX(this.acceleration);
            }
            this.setFlipX(false);
        } else if (this.keys.get("LEFT").isDown){
            if(this.body.blocked.left){  
                this.body.velocity.x = 0;
            }else {
                this.body.setAccelerationX(-this.acceleration);
            }
            this.setFlipX(true);
        } else {
            this.body.setVelocityX(0);
            this.body.setAccelerationX(0);
        }

        // Jumping
        if((this.keys.get("JUMP").isDown || this.keys.get("JUMP2").isDown) && !this.isJumping) {
            this.body.setVelocityY(-400);
            this.isJumping = true;
        }
    }

    private handleAnimations(){
        if (this.body.velocity.y !== 0) {
            //this.anims.stop();
            // mario is jumping or falling
            if(this.body.velocity.y > 0) {
                this.setFrame('mario_15');
            } else {
                this.setFrame('mario_14');
            }
        } else if (this.body.velocity.x !== 0) {
            if(this.body.velocity.x > 0) {
                this.anims.play("runRight", true);
            } else {
                this.anims.play("runRight", true);
            }
        }else {
            //this.anims.stop();
            this.setFrame('mario_05');
        }
    }
}