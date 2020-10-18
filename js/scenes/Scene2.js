class Scene2 extends Phaser.Scene {

    constructor() {
        super('playGame');

        this.state = {
            score: 0,
            gameOver: false,
            ammunition: 5,
            grenades: 0,
            reloading: false,
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


        // Add enemy idle sprites
        this.enemy1 = this.physics.add.sprite(0, config.height - this.getRandomY(280, 320), 'enemyIdle');
        this.enemy2 = this.physics.add.sprite(0, config.height - this.getRandomY(180, 280), 'enemyIdle');
        this.enemy3 = this.physics.add.sprite(0, config.height - this.getRandomY(100, 180), 'enemyIdle');


        this.enemy1.play('enemy_idle');
        this.enemy2.play('enemy_idle');
        this.enemy3.play('enemy_idle');


        // Show hitbox just for testing
        //this.game.debug.body(this.enemy1);



        // Make enemy interactive
        this.enemy1.setInteractive();
        this.enemy2.setInteractive();
        this.enemy3.setInteractive();



        // Make enemies group
        this.enemies = this.physics.add.group();
        this.enemies.add(this.enemy1);
        this.enemies.add(this.enemy2);
        this.enemies.add(this.enemy3);


        /**
         * Loop over each enemy in the group and 
         * set their health to 100
         */
        this.enemies.children.entries.forEach(enemy => {
            enemy.health = 100;
        });


        // Make enemies stop and attack when they get to the sandbags 
        this.physics.add.overlap(this.sandbags, this.enemies, this.enemyAttacking, null, this);

        // Make bullets hurt enemies
        this.physics.add.overlap(this.bullets, this.enemies, this.enemyHit, null, this);

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


        // Move Enemy
        this.moveEnemy(this.enemy1, 3)
        this.moveEnemy(this.enemy2, 4)
        this.moveEnemy(this.enemy3, 2)
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

        bullet.setInteractive();

        bullet.body.velocity.x = -1000;
        this.bullets.add(bullet);
    }



    moveEnemy(enemy, speed) {
        /**
         * If enemy  attacking brake out of function, 
         * so stop moving
         * */
        if (enemy.anims.getCurrentKey() === 'enemy_attacking') {
            return;
        }
        enemy.x += speed;
    }




    /**
     * Title: getRandomY source code
     * Author: Lior Elrom
     * Date: 2020
     * Code version: 1.0
     * Availability: https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
     * 
     */
    // This will be used to set the start enemy positions
    getRandomY(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }



    enemyAttacking(sandBags, enemy) {

        // If enemy is already attacking brake out of function
        if (enemy.anims.getCurrentKey() === 'enemy_attacking') {
            return;
        }

        // stop enemy from moving
        this.state.enemyMoving = false;


        enemy.setTexture('enemyAttacking');
        enemy.play('enemy_attacking');

    }




    enemyHit(bullet, enemy) {

        // Destroy bullet
        bullet.destroy();

        enemy.alpha = 0;

        setTimeout(() => {
            enemy.alpha = 1;
        }, 50);

         
        // Subtract  25% of enemy health 
        enemy.health -= 100;

        if (enemy.health <= 0) {
            this.enemyRespawn(enemy);
        }
    }


    enemyRespawn(enemy) {

        // Set health to 100%
        enemy.health = 100;


        // Reset enemy position
        enemy.x = -100;
        enemy.y = config.height - this.getRandomY(280, 320);
       
        
        /**
         * This will change the sprite to the idle one and
         * the moveEnemy method in update will automatically 
         * the enemy move
         */
        setTimeout(() => {
            enemy.setTexture('enemyIdle');
            enemy.play('enemy_idle');
        }, 1000);
    


    }


    // render() {

    //     console.log(game.debug)

    //     game.debug.bodyInfo(this.enemy1, 32, 32);
    
    //     // game.debug.body(sprite1);
    //     // game.debug.body(sprite2);
    
    // }

}