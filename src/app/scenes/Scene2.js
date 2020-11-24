import Phaser from 'phaser';

import config from '../phaser/config';

export default class Scene2 extends Phaser.Scene {

    constructor() {
        super('playGame');
    }

    init(data){

        // Get difficulty from scene one
        this.difficulty = data.difficulty;
    }

    create() {
        // Add background
        this.background = this.add.image(this.cameras.main.width / 2, config.height - 520, 'background');

        

        // Add scoreLabel variable with Bitmap text function
        //this.scoreLabel = this.add.bitmapText(10, 5, 'pixelFont', 'SCORE:', 16);

        // Add text
        // this.text = this.add.text(100, 100, 'Select difficulty:');
        // this.easyButton = this.add.text(100, 140, 'Easy');
        // this.hardButton = this.add.text(100, 180, 'Hard');

        // For report https://snowbillr.github.io/blog/2018-07-03-buttons-in-phaser-3/

    }

    update() {

    }

}