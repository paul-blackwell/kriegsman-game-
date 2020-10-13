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
        this.player = this.physics.add.sprite(config.width - 180, config.height - 200, 'player');
        this.player.play('player_idle');

        // Stop player from going off the screen
        this.player.setCollideWorldBounds(true);

        // Make variable to listen for cursor keys
        this.cursorKeys = this.input.keyboard.createCursorKeys();

    }

    update() {
        // This function will control the players movement
        this.movePlayer();
    }


    movePlayer() {


        /**
         * This will change the player texture to a
         * walking sprite if they are moving, Might refactor this
         * later to use a boolean 
         */
        const makePlayerWalk = () => {
            if(this.player.texture.key === 'player') {
                this.player.setTexture('playerWalking');
                this.player.play('player_walking');
           }
        }

        /**
        * So every time the up arrow key is pressed we adjust
        * the speed of the player with a negative value, so they move
        * up the screen but we also don't want the player going off 
        * the foreground so they can't go higher than 320px,  
        * "this.player.y > 320", then play walking animation
        * 
        * else if the down key is pressed move to the down
        * then play walking animation
        * 
        * else set the X velocity to 0 to stop the ship from moving
        * then play idle animation
        */
        if (this.cursorKeys.up.isDown && this.player.y > 320) {
            this.player.setVelocityY(-gameSettings.playerSpeed);
            makePlayerWalk()
        } else if (this.cursorKeys.down.isDown) {
            this.player.setVelocityY(gameSettings.playerSpeed)
            makePlayerWalk()
        } else {
            this.player.setVelocityY(0)
            if(this.player.texture.key === 'playerWalking') {
                this.player.setTexture('player');
                this.player.play('player_idle');
           }
        }
    }



}