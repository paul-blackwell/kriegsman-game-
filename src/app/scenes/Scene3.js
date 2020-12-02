import Phaser from 'phaser';

export default class Scene3 extends Phaser.Scene {

    constructor() {
        super('endGame');
    }


    create() {

        // Just for testing
        this.cameras.main.setBackgroundColor('#040C06');

         // Text for  'Select difficulty:'
         this.text = this.add.text(100, 100, 'Game over', { fill: '#0f0' });
    }

}