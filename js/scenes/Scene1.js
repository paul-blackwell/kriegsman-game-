class Scene1 extends Phaser.Scene {

    constructor() {
        super('bootgame');
    }

    // Preload all Images an spites 
    preload(){
        this.load.image('foreground', 'assets/images/foreground.png');

        this.load.spritesheet('player', 'assets/spritesheets/krieg-guardsman-shritesheet.png', {
            frameWidth: 160,
            frameHeight: 192,
        });
    }

    create() {
        this.add.text(20, 20, "Loading game... ");
        this.scene.start('playGame');

        // Basic 2 frame looping animation of the player
        this.anims.create({
            key: 'player_idle',
            frames: this.anims.generateFrameNumbers('player'), // using the frames from the player sprite sheet
            frameRate: 16,
            repeat: -1
        })

    }


}