class Scene1 extends Phaser.Scene {

    constructor() {
        super('bootgame');
    }

    // Preload all Images an spites 
    preload() {

        // Image for background
        this.load.image('background', 'assets/images/background.png');

        // Image for foreground
        this.load.image('foreground', 'assets/images/foreground.png');


        // Image for tank traps
        this.load.image('tankTraps', 'assets/images/tank-traps.png');

        // Image for Sandbags
        this.load.image('sandbags', 'assets/images/sandbags.png');


        // Spitesheet for player Idle
        this.load.spritesheet('player', 'assets/spritesheets/krieg-guardsman-shritesheet.png', {
            frameWidth: 160,
            frameHeight: 192,
        });

        // Spitesheet for player Walking
        this.load.spritesheet('playerWalking', 'assets/spritesheets/krieg-guardsman-animated-walking-sprite.png', {
            frameWidth: 160,
            frameHeight: 192,
        });

        // Spitesheet for player Shooting
        this.load.spritesheet('playerShooting', 'assets/spritesheets/krieg-guardsman-animated-shooting-sprite.png', {
            frameWidth: 192,
            frameHeight: 192,
        });

         // Spitesheet for player reloading
         this.load.spritesheet('playerReloading', 'assets/spritesheets/krieg-guardsman-animated-reloading-sprite.png', {
            frameWidth: 192,
            frameHeight: 192,
        });

        // Spritesheet for bullet
        this.load.spritesheet('bullet', 'assets/spritesheets/bullet-sprite.png', {
            frameWidth: 32,
            frameHeight: 32,
        });
    }

    create() {
        this.add.text(20, 20, "Loading game... ");
        this.scene.start('playGame');

        // Animation of the player idle
        this.anims.create({
            key: 'player_idle',
            frames: this.anims.generateFrameNumbers('player'), // using the frames from the player sprite sheet
            frameRate: 16,
            repeat: -1
        });

        // Animation of the player walking
        this.anims.create({
            key: 'player_walking',
            frames: this.anims.generateFrameNumbers('playerWalking'), 
            frameRate: 16,
            repeat: -1
        });


        // Animation of the player Shooting 
        this.anims.create({
            key: 'player_shooting',
            frames: this.anims.generateFrameNumbers('playerShooting'), 
            frameRate: 16,
        });

        // Animation of the player Shooting 
        this.anims.create({
            key: 'player_reloading',
            frames: this.anims.generateFrameNumbers('playerReloading'), 
            frameRate: 16,
        });

        // Animation of the bullet in the air
        this.anims.create({
            key: 'bullet_anim',
            frames: this.anims.generateFrameNumbers('bullet'), 
            frameRate: 16,
        });
    }


}