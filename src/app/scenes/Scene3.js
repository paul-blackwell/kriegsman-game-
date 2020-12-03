import Phaser from 'phaser';

export default class Scene3 extends Phaser.Scene {

    constructor() {
        super('endGame');
    }


    init(data) {
        // Get players score 
        this.score = data.score;
    }


    create() {

        // Just for testing
        this.cameras.main.setBackgroundColor('#040C06');

         // Text for  'Select difficulty:'
         this.text1 = this.add.text(100, 100, 'Game over', { fill: '#0f0' });

          // Text for  'Select difficulty:'
          this.text2 = this.add.text(100, 130, `Your score: ${this.score}`, { fill: '#0f0' });
    }

}