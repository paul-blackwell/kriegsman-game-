import Phaser from 'phaser';

// Images
import background from '../../assets/images/background.png'
import foreground from '../../assets/images/foreground.png';
import GUI from '../../assets/images/GUI.png';
import commissar from '../../assets/images/krieg-commissar-upper-body.png';
import playEasyButton from '../../assets/images/play-easy-button.png';
import playHardButton from '../../assets/images/play-hard-button.png';
import gameTitle from '../../assets/images/game-title.png';

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
import backgroundMusic from '../../assets/audio/background-fx.mp3';
import gunShot from '../../assets/audio/gun-shot.mp3';
import reloadSound from '../../assets/audio/reload-sound.mp3';
import bulletHit from '../../assets/audio/bullet-hit.mp3';
import swordOne from '../../assets/audio/sword-Fx-1.mp3';
import swordTwo from '../../assets/audio/sword-Fx-2.mp3';
import runningOne from '../../assets/audio/running-Fx-1.mp3';


// Fonts
import fontPNG from '../../assets/fonts/customFont_0.png';
import fontXML from '../../assets/fonts/customFont.fnt';



export default class Scene1 extends Phaser.Scene {

    constructor() {
        super('bootgame');
    }

    // Preload all Images an spites 
    preload() {

        // Just for testing
        this.load.bitmapFont('pixelFont', fontPNG, fontXML)


        // Image for game title
        this.load.image('gameTitle', gameTitle);

        // Image for play easy button
        this.load.image('playEasyButton', playEasyButton);

        // Image fo play hard button
        this.load.image('playHardButton', playHardButton);

        // Image for background
        this.load.image('background', background);

        // Image for foreground
        this.load.image('foreground', foreground);

        // Image for GUI
        this.load.image('GUI', GUI);

        // Image for commissar
        this.load.image('commissar', commissar);

        // Background Audio 
        this.load.audio('background_music_audio', [backgroundMusic]);

        // Load Gunshot Audio 
        this.load.audio('gunshot_audio', [gunShot]);

        // Load reload audio
        this.load.audio('reload_audio', [reloadSound]);

        // Load bullet hit audio
        this.load.audio('bullet_hit_audio', [bulletHit]);

        // Load audio for sword hit one   
        this.load.audio('sword_hit_one_audio', [swordOne]);

        // Load audio for sword hit two   
        this.load.audio('sword_hit_two_audio', [swordTwo]);

        // Load audio for running one
        this.load.audio('running_one_audio', [runningOne]);

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
         *  This will get the loader div and hide it
         */
        const loader = document.querySelector('.loader');
        loader.classList.add('loader--hide');


        // Set background colour 
        this.cameras.main.setBackgroundColor('#112318');


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


        // Test font
        this.testFont = this.add.bitmapText(this.cameras.main.width / 2, 100 , 'pixelFont', 'test', -16)

        // Add Title
        this.title = this.add.image(this.cameras.main.width / 2, 240, 'gameTitle');


        // Difficulty buttons
        this.difficultyEasyButton = this.add.image(this.cameras.main.width / 2, 360, 'playEasyButton');
        this.difficultyEasyButton.setInteractive({ useHandCursor: true  });
        this.difficultyEasyButton.on('pointerdown', () => this.scene.start('playGame', { difficulty: 'easy' }));

        this.difficultyHardButton = this.add.image(this.cameras.main.width / 2, 440, 'playHardButton');
        this.difficultyHardButton.setInteractive({ useHandCursor: true  });
        this.difficultyHardButton.on('pointerdown', () => this.scene.start('playGame', { difficulty: 'hard' }));

    }
}