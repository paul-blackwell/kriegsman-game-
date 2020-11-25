import Phaser from 'phaser';

// Images
import background from '../../assets/images/background.png'
import foreground from '../..//assets/images/foreground.png';

// Spites
import playerIdle from '../../assets/spritesheets/krieg-guardsman-shritesheet.png'
import playerWalking from '../../assets/spritesheets/krieg-guardsman-animated-walking-sprite.png';
import playerShooting from '../../assets/spritesheets/krieg-guardsman-animated-shooting-sprite.png';


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


        // Player spritesheet (for player Idle)
        this.load.spritesheet('playerIdle', playerIdle, {
            frameWidth: 160,
            frameHeight: 192,
        });

        // Player spritesheet (for player walking)
        this.load.spritesheet('playerWalking', playerWalking, {
            frameWidth: 160,
            frameHeight: 192,
        });

        // Player spritesheet (for player shooting)
        this.load.spritesheet('playerShooting', playerShooting, {
            frameWidth: 192,
            frameHeight: 192,
        });


    }

    create() {

        // Just for testing
        this.cameras.main.setBackgroundColor('#040C06');


        // Animation of the player idle
        this.anims.create({
            key: 'player_idle_animation',
            frames: this.anims.generateFrameNumbers('playerIdle'), // using the frames from the player sprite sheet
            frameRate: 16,
            repeat: -1
        });


        // Animation of the player walking
        this.anims.create({
            key: 'player_walking_animation',
            frames: this.anims.generateFrameNumbers('playerWalking'),
            frameRate: 16,
            repeat: -1
        });

        // Animation of the player Shooting 
        this.anims.create({
            key: 'player_shooting_animation',
            frames: this.anims.generateFrameNumbers('playerShooting'),
            frameRate: 16,
        });


        this.text = this.add.text(100, 100, 'Select difficulty:', { fill: '#0f0' });


        // For report https://snowbillr.github.io/blog/2018-07-03-buttons-in-phaser-3/
        // https://www.youtube.com/watch?v=S1VSKkL_ePM&t=149s

        // Difficulty buttons
        const difficultyButton = this.add.text(100, 140, 'Easy', { fill: '#0f0' });
        difficultyButton.setInteractive();
        difficultyButton.on('pointerdown', () => this.scene.start('playGame', { difficulty: 'easy' }));

    }
}