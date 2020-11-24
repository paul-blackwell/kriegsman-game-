import Phaser from 'phaser';

// Images
import background from '../../assets/images/background.png'
import foreground from '../..//assets/images/foreground.png';


export default class Scene1 extends Phaser.Scene {

    constructor() {
        super('bootgame');
    }

    // Preload all Images an spites 
    preload() {
        // Image for background
        this.load.image('background', background);

        // Image for foreground
        this.load.image('foreground', foreground);
    }

    create() {

        // Just for testing
        this.cameras.main.setBackgroundColor('#040C06');

        this.text = this.add.text(100, 100, 'Select difficulty:', { fill: '#0f0' });


        // For report https://snowbillr.github.io/blog/2018-07-03-buttons-in-phaser-3/
        const difficultyButton = this.add.text(100, 140, 'Easy', { fill: '#0f0' });
        difficultyButton.setInteractive();
        difficultyButton.on('pointerdown', () => this.scene.start('playGame', { difficulty: 'easy' }));

        console.log(difficultyButton)
    }
}