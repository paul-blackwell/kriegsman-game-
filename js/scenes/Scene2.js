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


        // Add enemy running sprites
        this.enemy1 = this.physics.add.sprite(0, this.getRandomNumber(250, 300), 'enemyRunning');
        this.enemy2 = this.physics.add.sprite(0, this.getRandomNumber(350, 400), 'enemyRunning');
        this.enemy3 = this.physics.add.sprite(0, this.getRandomNumber(450, 550), 'enemyRunning');


        // Change  bounding box size of enemies
        this.enemy1.body.setSize(70, 140, true);
        this.enemy2.body.setSize(70, 140, true);
        this.enemy3.body.setSize(70, 140, true);


        this.enemy1.play('enemy_running');
        this.enemy2.play('enemy_running');
        this.enemy3.play('enemy_running');




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
         * set their health to 100 and add their speed 
         */
        this.enemies.children.entries.forEach(enemy => {
            enemy.health = 100;
            enemy.speed = this.getRandomNumber(1,6);
        });


        // Make enemies stop and attack when they get to the sandbags 
        this.physics.add.overlap(this.sandbags, this.enemies, this.enemyAttacking, null, this);

        // Change bounding box size of sandbags
        this.sandbags.body.setSize(200, this.sandbags.height, true);

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


        // Move Enemies 
        this.enemies.children.entries.forEach(enemy => {
            this.moveEnemy(enemy, enemy.speed)
        });
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
        if (enemy.anims.getCurrentKey() !== 'enemy_running') {
            return;
        }
        enemy.x += speed;
    }




    /**
     * Title: getRandomNumber source code
     * Author: Lior Elrom
     * Date: 2020
     * Code version: 1.0
     * Availability: https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
     * 
     */
    // This will be used to set the start enemy positions
    getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }



    enemyAttacking(sandBags, enemy) {

        // If enemy is already attacking brake or is hit out of function
        if (enemy.anims.getCurrentKey() === 'enemy_attacking' || enemy.anims.getCurrentKey() === 'enemy_shotChest') {
            return;
        }

        enemy.setTexture('enemyAttacking');
        enemy.play('enemy_attacking');

    }




    enemyHit(bullet, enemy) {


        // Destroy bullet
        bullet.destroy();


        // Add to playerScore
        this.state.score += 50;



        // Change sprite 
        enemy.setTexture('enemyShotChest');
        enemy.play('enemy_shotChest');


        // Add fadeout 
        const timeline = this.tweens.createTimeline();

        timeline.add({
            targets: enemy,
            alpha: 0,
            ease: 'Power1',
            duration: 50
        });
        timeline.add({
            targets: enemy,
            alpha: 1,
            ease: 'Power1',
            duration: 50
        });

        timeline.add({
            targets: enemy,
            alpha: 0,
            ease: 'Power1',
            duration: 1000
        });

        timeline.play();


        // Subtract  25% of enemy health 
        enemy.health -= 100;

        if (enemy.health <= 0) {
            setTimeout(() => {
                this.enemyRespawn(enemy);
            }, 1100);
        }
    }


    enemyRespawn(enemy) {

        // Reset enemy speed
        enemy.speed = this.getRandomNumber(1, 6)

        // Set alpha to 1 so we can see the enemy 
        const timeline = this.tweens.createTimeline();
        timeline.add({
            targets: enemy,
            alpha: 1,
            ease: 'Power1',
            duration: 50
        });
        timeline.play();
        

        // Set health to 100%
        enemy.health = 100;

        /**
         * Reset enemy position but check their Y position
         * as we don't want them overlapping when they respawn
         */
        enemy.x = -100;
        if (enemy.y <= 300) {
            enemy.y = this.getRandomNumber(250, 300);
        } else if (enemy.y <= 400) {
            enemy.y = this.getRandomNumber(350, 400);
        } else {
            enemy.y = this.getRandomNumber(450, 550);
        }

        /**
         * This will change the sprite to the running one and
         * the moveEnemy method in update will automatically 
         * the enemy move
         */
        setTimeout(() => {
            enemy.setTexture('enemyRunning');
            enemy.play('enemy_running');
        }, 1000);

    }


    // render() {

    //     console.log(game.debug)

    //     game.debug.bodyInfo(this.enemy1, 32, 32);

    //     // game.debug.body(sprite1);
    //     // game.debug.body(sprite2);

    // }

}