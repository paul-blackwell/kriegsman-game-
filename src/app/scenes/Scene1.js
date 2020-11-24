import Phaser from 'phaser';


export default class Scene1 extends Phaser.Scene {

    constructor() {
        super('bootgame');
    }

    // Preload all Images an spites 
    preload() {
        // Image for background
        this.load.image('background', 'imgs/background.png');
    }

    create() {
        this.add.text(20, 20, "Loading game... ");
        this.scene.start('playGame');

    }
}