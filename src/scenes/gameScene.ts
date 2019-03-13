import { Player } from "../objects/player";


export class GameScene extends Phaser.Scene {
    private map: Phaser.Tilemaps.Tilemap;
    private tileset: Phaser.Tilemaps.Tileset;

    private player: Player;

    private backgroundLayer: Phaser.Tilemaps.DynamicTilemapLayer;
    private designLayer: Phaser.Tilemaps.DynamicTilemapLayer;
    private lastTile: any;
    private edit: boolean;

    // input
    private keys: Map<string, Phaser.Input.Keyboard.Key>;

    constructor(){
        super({ key: "GameScene"});
    }

    init(): void{
        //this.game.renderer.resize(384, 208);
    }

    create(): void{
        // input
        this.keys = new Map([
            ["ESC", this.addKey("ESC")]
        ]);

        this.keys.get("ESC").on('down', GameScene.prototype.toggleEditor, this);

        this.map = this.make.tilemap({ key: this.registry.get("level")});
        this.tileset = this.map.addTilesetImage("ground");

        this.designLayer = this.map.createDynamicLayer(
            "Creator",
            this.tileset,
            0,
            0
        );
        this.designLayer.setScale(2);
        this.designLayer.setVisible(false);

        this.backgroundLayer = this.map.createDynamicLayer(
            "ground",
            this.tileset, 
            0,
            0
        );
        this.backgroundLayer.setScale(2);
        this.backgroundLayer.setCollisionByExclusion([-1]);        

        this.player = new Player({
            scene: this,
            x: this.registry.get("spawn").x,
            y: this.registry.get("spawn").y,
            key: "player"
        });
        this.player.setScale(2);

        this.physics.add.collider(this.player, this.backgroundLayer);
        this.physics.world.bounds.width = this.backgroundLayer.width * 2;
        this.physics.world.bounds.height = this.backgroundLayer.height * 2 + 1500;
        this.physics.world.bounds.y = -1000;
        
        this.player.body.setCollideWorldBounds(true);
        //camera

        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(0,0,this.backgroundLayer.width * 2, this.backgroundLayer.height * 2);
    }

    update(): void {
        if(this.edit)
        {
            const worldPoint = this.input.activePointer.positionToCamera(this.cameras.main);
            if(this.input.manager.activePointer.justMoved){
                if(this.lastTile !== undefined){
                    // @ts-ignore
                    this.designLayer.removeTileAtWorldXY(this.lastTile.x, this.lastTile.y);
                    this.designLayer.putTileAtWorldXY(21, this.lastTile.x, this.lastTile.y);
                }
                this.lastTile = worldPoint;
                // @ts-ignore
                this.designLayer.putTileAtWorldXY(2, worldPoint.x, worldPoint.y);
            }
            if(this.input.manager.activePointer.isDown){
                // @ts-ignore
                this.backgroundLayer.putTileAtWorldXY(2, worldPoint.x, worldPoint.y);
            }
        }else{
            this.player.update();
        }
    }

    toggleEditor() {
        this.edit = !this.edit;
        if(this.edit){
            this.designLayer.setVisible(true);
        }else {
            this.designLayer.setVisible(false);
        }
    }

    private addKey(key: string): Phaser.Input.Keyboard.Key {
        return this.input.keyboard.addKey(key);
    }
}