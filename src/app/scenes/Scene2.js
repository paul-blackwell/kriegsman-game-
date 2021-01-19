import Phaser from 'phaser';

import config from '../phaser/config';

import GUI from '../classes/GUI';
import Sandbags from '../classes/Sandbags';
import TankTrap from '../classes/TankTrap';
import Player from '../classes/Player';
import Enemy from '../classes/Enemy';


export default class Scene2 extends Phaser.Scene {

    constructor() {
        super('playGame');

        this.state = {
            gameOver: false,
            ammoCount: 6,
            score: 0
        }
    }

    init(data) {
        // Get difficulty from scene one
        this.difficulty = data.difficulty;
    }

    create() {


        // Add background
        this.background = this.add.image(this.cameras.main.width / 2, config.height - 520, 'background');

        // Add foreground
        this.foreground = this.add.image(this.cameras.main.width / 2, config.height - 205, 'foreground');

        // Add GUI
        this.gui = new GUI(this, this.cameras.main.width / 2, config.height - 320, this.state.ammoCount);

        // Add background music
        this.backgroundMusic = this.sound.add('background_music_audio');
        this.backgroundMusic.play({
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        });


        // Add tank traps
        this.tankTrap1 = new TankTrap(this, 700);
        this.tankTrap2 = new TankTrap(this, 100);
        this.tankTrap2 = new TankTrap(this, 400);

        // And Sandbags
        this.sandbags = new Sandbags(this, 100);


        // Make Player
        this.player = new Player(this);

        // Make enemies using the makeEnemies method based on difficulty
        this.enemies = this.makeEnemies(this.difficulty);


        // Make variable to listen for cursor keys
        this.cursorKeys = this.input.keyboard.createCursorKeys();

        //  Make variable to listen for space bar key so player can shoot
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        //  Make variable to listen for "R" key so player can reload
        this.rKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        // This will hold all the 'bullet' Instances in the scene 
        this.activeBullets = [];


        /**
         * This will Loop over enemies and add overlap between them and the bullets
         * and overlap between them and the sandbags so they can interact.
         */
        this.enemies.forEach(enemy => {
            // add overlap between enemies and bullets
            this.physics.add.overlap(enemy, this.activeBullets, () => {

                /**
                 * Check the enemy health as we don't want to destroy,
                 * the bullet if the enemy is already dead, we have to do this
                 * because the enemies take one second to fade off the screen
                 */
                if (enemy.health > 0) {

                    // If bullet hits enemy run enemy hit method
                    enemy.enemyHit();

                    // Add 10 to score
                    this.state.score += 10;

                    // Destroy the bullet  (Note this will destroy all bullets, works for now but will need to be changed)
                    this.activeBullets.forEach(bullet => {
                        bullet.destroy();
                    });

                }

            }, null, this);

            //Make enemies stop and attack when they get to the sandbags 
            this.physics.add.overlap(enemy, this.sandbags, () => {

                if (this.sandbags.health <= 0) {
                    this.state.gameOver = true;  // If the sandbags have no heath end the game
                    return;
                }

                enemy.enemyAttack();
                this.sandbags.damageSandBags();
            }, null, this);
        });

    }


    /**
     * This will add instances of enemies to enemies
     *  array depending on the difficulty
     * @param {Strings 'easy, hard', will set the number of enemy loaded into the scene} difficulty 
     */
    makeEnemies(difficulty) {

        // Make enemies array 
        const enemies = []

        const makeEnemies = (numberOfEnemies) => {
            for (let i = 0; i < numberOfEnemies; i++) {

                // Make new enemies and push to the enemies array
                const enemy = new Enemy(this, 100);
                enemies.push(enemy);
            }
        }

        if (difficulty === 'easy') {
            makeEnemies(3);
        } else if (difficulty === 'hard') {
            makeEnemies(5);
        }

        return enemies;
    }



    gameOver() {
        // make all enemies run again
        this.enemies.forEach(enemy => {
            enemy.enemyRun();
        });

        // set game over state to false as you only want this to run one time
        this.state.gameOver = false;


        // After one second go to scene 3 and pass the players score
        setTimeout(() => {
             // Stop all audio form playing otherwise it will play in scene3
            this.game.sound.stopAll();
            this.scene.start('endGame', { score: this.state.score });
        }, 1000)

    }



    update() {

        // Shoot gun when spacebar is pressed
        if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
            this.player.playerShoot();
            /**
             * Set the state to the player ammo count, we will need 
             * to do this to update the ammo counter in the GUI
             */
            this.state.ammoCount = this.player.state.playerAmmoCount;
        }

        // Reload gun when "r" key is pressed 
        if (Phaser.Input.Keyboard.JustDown(this.rKey)) {
            this.player.playerReload();
            /**
            * Set the state to the player ammo count, we will need 
            * to do this to update the ammo counter in the GUI
            */
            this.state.ammoCount = this.player.state.playerAmmoCount;
        }


        // Move player on up and down keys
        if (this.cursorKeys.up.isDown && this.player.y > 300) {
            this.player.movePlayer('up');
        } else if (this.cursorKeys.down.isDown && this.player.y < 540) {
            this.player.movePlayer('down');
        } else {
            this.player.movePlayer('stop');
        }


        /**
       * Run the update of each bullet instance (they are stored 
       * in the activeBullets array). This will destroy them once they
       * get 50px from the left edge of the screen. 
       * If we don't do this each bullet will cause performance problems as 
       * they will go on forever.
       * 
       * check note on Bullet classes update method for more info 
       */
        this.activeBullets.forEach(bullet => {
            bullet.update();
        });


        // This will end game is state set to true
        if (this.state.gameOver) {

            // End game
            this.gameOver();
        }

        /**
         * Run the update function in the GUI and pass the this.state.ammoCount and 
         * this.state.score as an argument 
         */
        this.gui.update(this.state.ammoCount, this.state.score);
    }





}