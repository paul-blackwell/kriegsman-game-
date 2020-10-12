class Scene2 extends Phaser.Scene {

    constructor() {
        super('playGame');
    }

    create() {

        //. Just for testing
        this.cameras.main.setBackgroundColor('#040C06');


        // Add foreground
        this.foreground = this.add.image(this.cameras.main.width / 2, config.height - 210, 'foreground')


        // Add player image for testing
        //this.player = this.add.image(config.width - 180, config.height / 2, 'player');
        this.player = this.add.sprite(config.width - 180, config.height / 2, 'player');
        this.player.play('player_idle');

        // Stop player from going off the screen
        //this.player.setCollideWorldBounds(true);

        // Make variable to listen for cursor keys
        this.cursorKeys = this.input.keyboard.createCursorKeys();

    }

    update() {
        // This function will control the players movement
        this.movePlayer();
    }


    movePlayer() {
        /**
        * So every time the left arrow key is pressed we adjust
        * the speed of the players with a negative value, so they move
        * to the left
        * 
        * else if the right key is pressed move to the right
        * 
        * else set the X velocity to 0 to stop the ship from moving
        */
        // if (this.cursorKeys.left.isDown) {
        //     this.player.setVelocityY(-gameSettings.playerSpeed);
        // } else if (this.cursorKeys.right.isDown) {
        //     this.player.setVelocityY(gameSettings.playerSpeed)
        // } else {
        //     this.player.setVelocityY(0)
        // }
    }



}