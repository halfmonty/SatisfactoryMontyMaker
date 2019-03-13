import "phaser";
import { LoadingScene } from './scenes/loadingScene';
import { WelcomeScene } from "./scenes/welcomeScene";
import { GameScene } from "./scenes/gameScene";
import { HudScene } from "./scenes/hudScene";

const config: GameConfig = {
    title: "Starfall",
    width: 800,
    height: 600,
    parent: "game",
    type: Phaser.AUTO,
    scene: [LoadingScene, WelcomeScene, GameScene, HudScene],
    input: { keyboard: true },
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 900 },
            debug: false
        }
    },
    backgroundColor: "#5c94fc",
    render: { pixelArt: true, antialias: false }
}

export class Game extends Phaser.Game {
    constructor(config: GameConfig) {
        super(config);
    }
};

window.onload = () => {
    var game = new Game(config);
};