import Phaser from 'phaser';

// Images
import background from '../../assets/images/background.png'


export default class Scene1 extends Phaser.Scene {

    constructor() {
        super('bootgame');
    }

    // Preload all Images an spites 
    preload() {
        // Image for background
        this.load.image('background', background);
    }

    create() {
       
        // Just for testing
        this.cameras.main.setBackgroundColor('#040C06');

        this.text = this.add.text(100, 100, 'Select difficulty:', { fill: '#0f0' });

        const difficultyButton = this.add.text(100, 140, 'Easy', { fill: '#0f0' });
        difficultyButton.setInteractive();
        difficultyButton.on('pointerdown', () => this.scene.start('playGame'));

        console.log(difficultyButton)
    }
}