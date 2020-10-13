class Scene2 extends Phaser.Scene {

    constructor() {
        super('playGame');

        this.state = {
            score: 0,
            gameOver: false,
            ammunition: 10,
            grenades: 0,
            reloading: false
        }
    }

    create() {

        // Just for testing
        this.cameras.main.setBackgroundColor('#040C06');


        // Add foreground
        this.foreground = this.add.image(this.cameras.main.width / 2, config.height - 210, 'foreground')


        // Add player sprite
        this.player = this.physics.add.sprite(config.width - 180, config.height - 200, 'player');
        this.player.play('player_idle');

        // Stop player from going off the screen
        this.player.setCollideWorldBounds(true);

        // Make variable to listen for cursor keys
        this.cursorKeys = this.input.keyboard.createCursorKeys();

        //  Make variable to listen for space bar key so player can shoot
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);


        this.rkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        //  keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        //  this.rKey = this.input.keyboard.addKey('R');

    }

    update() {

        // This function will control the players movement
        this.movePlayer();

        // Shoot gun when spacebar is pressed
        if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
            if (this.player.active) {
                this.shootGun();
            }
        }


        // Reload gun when "r" key is pressed 
        if (Phaser.Input.Keyboard.JustDown(this.rkey)) {
            if (this.player.active) {
                this.reloadGun();
            }
        }

    }


    // Set player to Idle
    idlePlayer() {
        this.player.setTexture('player');
        this.player.play('player_idle');
    }


    movePlayer() {


        /**
         * This will change the player texture to a
         * walking sprite if they are moving, Might refactor this
         * later to use a boolean 
         */
        const makePlayerWalk = () => {
            if (this.player.texture.key === 'player') {
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
            if (this.player.texture.key === 'playerWalking') {
                this.idlePlayer();
            }
        }
    }


    shootGun() {

        /**
         * Check if player shooting animation is already playing
         * or the player is reloading. If so return (do nothing)
         */
        if (this.player.anims.getCurrentKey() === 'player_shooting' || this.state.reloading) {
            return;
        }


        this.player.play('player_shooting');


        /**
        * If ammunition count is equal to 0 reload the gun and return
        */
        if (this.state.ammunition === 0) {
            this.reloadGun();
            return;
        }


        // subtract one from the ammunition count
        if (this.state.ammunition > 0) {
            this.state.ammunition--;
            console.log(this.state.ammunition);
        }


        // After one second set player to idle
        setTimeout(() => {
            this.idlePlayer();
        }, 1000);

    }

    reloadGun() {

        /**
        * Check if player shooting animation is already playing
        * If so return (do nothing)
        */
        if (this.player.anims.getCurrentKey() === 'player_shooting') {
            return;
        }

        // Play reloading animation 
        this.player.play('player_reloading');

        // Set ammunition count to 10
        this.state.ammunition = 10;

        // After one second set player to idle
        setTimeout(() => {
            this.idlePlayer();
        }, 1000);
    }



}