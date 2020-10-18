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

        // Just for testing
        this.load.image('cultist', 'assets/images/cultist.png');

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

        // Spritesheet for enemy Idle
        this.load.spritesheet('enemyIdle', 'assets/spritesheets/cultist-animated-idle-sprite.png', {
            frameWidth: 160,
            frameHeight: 224,
        });

         // Spritesheet for enemy running
         this.load.spritesheet('enemyRunning', 'assets/spritesheets/cultist-animated-running-sprite.png', {
            frameWidth: 160,
            frameHeight: 224,
        });

        // Spritesheet for enemy attacking
        this.load.spritesheet('enemyAttacking', 'assets/spritesheets/cultist-animated-attacking-sprite.png', {
            frameWidth: 160,
            frameHeight: 224,
        });

        // Spritesheet for enemy shot in chest
        this.load.spritesheet('enemyShotChest', 'assets/spritesheets/cultist-animated-shot-in-chest-sprite.png', {
            frameWidth: 160,
            frameHeight: 224,
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
            repeat: -1
        });

        // Animation of the enemy idle
        this.anims.create({
            key: 'enemy_idle',
            frames: this.anims.generateFrameNumbers('enemyIdle'),
            frameRate: 16,
            repeat: -1
        });

          // Animation of the enemy running
          this.anims.create({
            key: 'enemy_running',
            frames: this.anims.generateFrameNumbers('enemyRunning'),
            frameRate: 16,
            repeat: -1
        });

        // Animation of the enemy attacking
        this.anims.create({
            key: 'enemy_attacking',
            frames: this.anims.generateFrameNumbers('enemyAttacking'),
            frameRate: 16,
            repeat: -1
        });

        // Animation of the enemy shot in chest
        this.anims.create({
            key: 'enemy_shotChest',
            frames: this.anims.generateFrameNumbers('enemyShotChest'),
            frameRate: 16,
        });
    }


}