

export class HudScene extends Phaser.Scene {
    private textElements: Map<string, Phaser.GameObjects.BitmapText>;
    private timer: Phaser.Time.TimerEvent;

    constructor() {
        super({ key: "HudScene" });
    }

    create(): void {
        this.textElements = new Map([
            ["TIME", this.addText(136, 8, `${this.registry.get("time")}`)]
        ]);

        const level = this.scene.get("GameScene");

        this.timer = this.time.addEvent({
            delay: 1000,
            callback: this.updateTime,
            callbackScope: this,
            loop: true
        });
    }

    private addText( x: number, y: number, value: string ): Phaser.GameObjects.BitmapText {
        return this.add.bitmapText(x, y, "font", value, 8);
    }

    private updateTime() {
        this.registry.values.time -= 1;
        this.textElements.get("TIME").setText(`${this.registry.get("time")}`);
    }
}