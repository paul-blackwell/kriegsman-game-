class Scene2 extends Phaser.Scene {

    constructor() {
        super('playGame');

        this.state = {
            score: 0,
            gameOver: false,
            ammunition: 5,
            grenades: 0,
            reloading: false,
            enemyMoving: true,
        }
    }

    create() {

        // Just for testing
        this.cameras.main.setBackgroundColor('#040C06');

        // Add background
        this.background = this.add.image(this.cameras.main.width / 2, config.height - 520, 'background');

        // Add foreground
        this.foreground = this.add.image(this.cameras.main.width / 2, config.height - 205, 'foreground');

        // Add tank traps
        this.tankTraps = this.add.image(this.cameras.main.width / 2, config.height - 205, 'tankTraps');


        // Add  sandbags
        this.sandbags = this.physics.add.image(this.cameras.main.width - 300, config.height - 194, 'sandbags');


        // Add player sprite
        this.player = this.physics.add.sprite(config.width - 180, config.height - 200, 'player');
        this.player.play('player_idle');


        // Stop player from going off the screen
        this.player.setCollideWorldBounds(true);

        // Make variable to listen for cursor keys
        this.cursorKeys = this.input.keyboard.createCursorKeys();

        //  Make variable to listen for space bar key so player can shoot
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        //  Make variable to listen for "R" key o player can reload
        this.rkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);


        // This will hold all the 'bullet' Instances in the scene 
        this.bullets = this.add.group();


        // Add enemy idle sprite
        this.enemy1 = this.physics.add.sprite(0, config.height - this.getRandomY(100, 320), 'enemyIdle');
    

        this.enemy1.play('enemy_idle');

        // Make enemy interactive
        this.enemy1.setInteractive();

       
        // Make enemies group
        this.enemies = this.physics.add.group();
        this.enemies.add(this.enemy1);


        // Make enemies stop and attack when they get to the sandbags 
        this.physics.add.overlap(this.sandbags, this.enemies, this.enemyAttacking, null, this);

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


        /**
         * Run the update for each bullet, this will
         * destroy a bullet when it gets 50px from the left 
         * edge of the screen. if we don't it will cause performance
         * problems as each bullet will go on forever
         */
        for (let i = 0; i < this.bullets.getChildren().length; i++) {
            const bullet = this.bullets.getChildren()[i];
            if (bullet.x < 50) {
                bullet.destroy()
                //bullet.body.velocity.x = 0;
            }
        }


        this.moveEnemy(this.enemy1, 3)
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

        // Play shooting animation 
        this.player.play('player_shooting');


        // Fire bullet but only after 500 milliseconds
        setTimeout(() => {
            // new Bullet(this);
            this.bullet()
        }, 500);


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
        this.state.reloading = true;

        // Set ammunition count to 10
        this.state.ammunition = 5;

        // After one second set player to idle
        setTimeout(() => {
            this.idlePlayer();
            this.state.reloading = false;
        }, 1000);
    }


    bullet() {
        const x = this.player.x - 60;
        const y = this.player.y - 45;

        // Add player sprite
        const bullet = this.physics.add.sprite(x, y, 'bullet');
        bullet.play('bullet_anim');

        bullet.body.velocity.x = -1000;
        this.bullets.add(bullet)
        console.log(this.bullets);
    }



    moveEnemy(enemy, speed) {
        if(this.state.enemyMoving === false){
            return;
        }
        enemy.x += speed;
    }



    // This will be used to set the start enemy positions
    // getRandomY() {
    //     const min = 100;
    //     const max =  320;
    //     return Math.floor(Math.random() * (max - min + 1)) + min;
    // }

    // This will be used to set the start enemy positions
    getRandomY(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }



    enemyAttacking(sandBags, enemy) {


        // If enemy is already attacking brake out of function
        if(enemy.anims.getCurrentKey() === 'enemy_attacking') {
            return;
        }

        // stop enemy from moving
        this.state.enemyMoving = false;

        console.log('Player stopped')
        
        enemy.setTexture('enemyAttacking');
        enemy.play('enemy_attacking');
      
      
        /**
       * Check if enemy attacking animation is already playing
       * If so return (do nothing)
       */
        // if (enemy.anims.getCurrentKey() === 'enemy_attacking') {
        //     return;
        // }


        // enemy.setTexture('enemyAttacking');
        // enemy.player.play('enemy_attacking');

        //console.log(enemy)
        //console.log('Im attacking the sandbags')
    }


}