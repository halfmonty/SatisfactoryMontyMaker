

export class WelcomeScene extends Phaser.Scene {
    title: Phaser.GameObjects.Text;
    hint: Phaser.GameObjects.Text;

    private startKey: Phaser.Input.Keyboard.Key;
    private bitmapTexts: Phaser.GameObjects.BitmapText[] = [];

    constructor() {
        super({
            key: "WelcomeScene"
        });
    }

    init(): void {
        this.startKey = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.ENTER
        );
        this.startKey.isDown = false;
        this.initGlobalDataManager();
    }

    create(): void {
        var titleText: string = "Satisfactory Monty Maker";
        this.title = this.add.text(+this.game.config.width/2 - 300, +this.game.config.height/2 - 100, titleText, 
            { font: '56px Arial Bold', fill: '#FBFBAC' });

        var hintText: string = "Click to start";
        this.hint = this.add.text(+this.game.config.width/2 - 60, +this.game.config.height/2, hintText,
              { font: '24px Arial Bold', fill: '#FBFBAC' });
    }

    update(): void {
        if(this.startKey.isDown || this.input.manager.activePointer.isDown) {
            this.scene.start("HudScene");
            this.scene.start("GameScene");
            this.scene.bringToTop("HudScene");
        }
    }

    private initGlobalDataManager(): void {
        this.registry.set("time", 400);
        this.registry.set("level", "level");
        this.registry.set("world", "1-1");
        this.registry.set("worldTime", "WORLD TIME");
        this.registry.set("score", 0);
        this.registry.set("coins", 0);
        this.registry.set("lives", 2);
        this.registry.set("spawn", { x: 12, y: 44, dir: "down" });
        this.registry.set("marioSize", "small");
    }
};