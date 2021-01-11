import Phaser from 'phaser';

// Images
import background from '../../assets/images/background.png'
import foreground from '../../assets/images/foreground.png';
import GUI from '../../assets/images/GUI.png';
import commissar from '../../assets/images/krieg-commissar-upper-body.png';

// Spites
import sandbags from '../../assets/spritesheets/sandbags-sprite-sheet.png';
import tankTrap from '../../assets/spritesheets/single-tank-trap-spite-sheet.png'
import playerIdle from '../../assets/spritesheets/krieg-guardsman-shritesheet.png'
import playerWalking from '../../assets/spritesheets/krieg-guardsman-animated-walking-sprite.png';
import playerShooting from '../../assets/spritesheets/krieg-guardsman-animated-shooting-sprite.png';
import playerReloading from '../../assets/spritesheets/krieg-guardsman-animated-reloading-sprite.png';
import enemyIdle from '../../assets/spritesheets/cultist-animated-idle-sprite.png'
import enemyRunning from '../../assets/spritesheets/cultist-animated-running-sprite.png';
import enemyAttacking from '../../assets/spritesheets/cultist-animated-attacking-sprite.png';
import enemyShotChest from '../../assets/spritesheets/cultist-animated-shot-in-chest-sprite.png';
import bullet from '../../assets/spritesheets/bullet-sprite.png';
import ammoCounter from '../../assets/spritesheets/ammo-counter-sprite-sheet.png';

// Audio
//import backgroundMusic from '../../assets/audio/background-music.mp3';
import gunShot from '../../assets/audio/gun-shot.mp3';
import reloadSound from '../../assets/audio/reload-sound.mp3';
import bulletHit from '../../assets/audio/bullet-hit.mp3';


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

        // Image for GUI
        this.load.image('GUI', GUI);

        // Image for commissar
        this.load.image('commissar', commissar);

        // Background Audio 
        //this.load.audio('background_music_audio', [backgroundMusic]);

        // Load Gunshot Audio 
        this.load.audio('gunshot_audio', [gunShot]);

        // Load reload audio
        this.load.audio('reload_audio', [reloadSound]);

        // Load bullet hit audio
        this.load.audio('bullet_hit_audio', [bulletHit]);

        // Sandbag spritesheet
        this.load.spritesheet('sandbags', sandbags, {
            frameWidth: 256,
            frameHeight: 384,
        });


        // tankTrap spritesheet
        this.load.spritesheet('tankTrap', tankTrap, {
            frameWidth: 160,
            frameHeight: 128,
        });


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

        // Player spritesheet (for player reloading)
        this.load.spritesheet('playerReloading', playerReloading, {
            frameWidth: 192,
            frameHeight: 192,
        });


        // Enemy spritesheet ( for idle)
        this.load.spritesheet('enemyIdle', enemyIdle, {
            frameWidth: 160,
            frameHeight: 224,
        });

        // Enemy spritesheet (for running)
        this.load.spritesheet('enemyRunning', enemyRunning, {
            frameWidth: 160,
            frameHeight: 224,
        });

        // Enemy spritesheet (for enemy attacking)
        this.load.spritesheet('enemyAttacking', enemyAttacking, {
            frameWidth: 160,
            frameHeight: 224,
        });

        //  Enemy spritesheet (for enemy shot in chest) 
        this.load.spritesheet('enemyShotChest', enemyShotChest, {
            frameWidth: 160,
            frameHeight: 224,
        });

        // Spritesheet for bullet
        this.load.spritesheet('bullet', bullet, {
            frameWidth: 32,
            frameHeight: 32,
        });

        // Spritesheet for ammo counter
        this.load.spritesheet('ammoCounter', ammoCounter, {
            frameWidth: 96,
            frameHeight: 32,
        });


    }


    
    create() {


        /**
         * We need to check the last asset in this case a spritesheet,
         * to see if the preload has finished, then hide the loader.
         * I don't like this solution but all the Phaser.js examples
         * I could find used a timeout function and I didn't want to 
         * do that, as some assets may take loader than the timeout 
         */
        if(this.textures.exists('ammoCounter')) {
            document.querySelector('.loader').classList.add('loader--hide');
        }



        // Set background colour 
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

        // Animation of the player reloading
        this.anims.create({
            key: 'player_reloading_animation',
            frames: this.anims.generateFrameNumbers('playerReloading'),
            frameRate: 16,
        });


        // Animation of the enemy idle
        this.anims.create({
            key: 'enemy_idle_animation',
            frames: this.anims.generateFrameNumbers('enemyIdle'),
            frameRate: 16,
            repeat: -1
        });

        // Animation of the enemy running
        this.anims.create({
            key: 'enemy_running_animation',
            frames: this.anims.generateFrameNumbers('enemyRunning'),
            frameRate: 16,
            repeat: -1
        });


        // Animation of the bullet in the air
        this.anims.create({
            key: 'bullet_animation',
            frames: this.anims.generateFrameNumbers('bullet'),
            frameRate: 16,
            repeat: -1
        });

        // Animation of the enemy attacking
        this.anims.create({
            key: 'enemy_attacking_animation',
            frames: this.anims.generateFrameNumbers('enemyAttacking'),
            frameRate: 16,
            repeat: -1
        });


        // Animation of the enemy shot in chest
        this.anims.create({
            key: 'enemy_shot_chest_animation',
            frames: this.anims.generateFrameNumbers('enemyShotChest'),
            frameRate: 16,
        });



        // Text for  'Select difficulty:'
        this.text = this.add.text(100, 100, 'Select difficulty:', { fill: '#0f0' });


        // For report https://snowbillr.github.io/blog/2018-07-03-buttons-in-phaser-3/
        // https://www.youtube.com/watch?v=S1VSKkL_ePM&t=149s

        // Difficulty buttons
        const difficultyEasyButton = this.add.text(100, 140, 'Easy', { fill: '#0f0' });
        difficultyEasyButton.setInteractive();
        difficultyEasyButton.on('pointerdown', () => this.scene.start('playGame', { difficulty: 'easy' }));

        const difficultyHardButton = this.add.text(100, 180, 'Hard', { fill: '#0f0' });
        difficultyHardButton.setInteractive();
        difficultyHardButton.on('pointerdown', () => this.scene.start('playGame', { difficulty: 'hard' }));

    }
}