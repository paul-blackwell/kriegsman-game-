import Character from './Character';
import getRandomNumber from '../utils/getRandomNumber';
import randomiseAudio from '../utils/randomiseAudio';
import config from '../phaser/config';

export default class Enemy extends Character {


    constructor(scene, health) {

        /**
         * Note we are also inheriting the animations from the scene,
         * as we have already preloaded them 
         */
        super(
            scene,
            health,
            'enemyRunning',
            'enemyAttacking',
            'enemyShotChest',
            'enemy_running_animation',
            'enemy_attacking_animation',
            'enemy_shot_chest_animation',
        );



        // Add game object to the scene
        scene.add.existing(this)


        // Add physics
        scene.physics.world.enableBody(this);


        this.scene = scene;
        this.health = health;

        this.state = {
            isEnemyAttacking: false,
        }

        // Add sword hit sound effect 
        this.swordHitOneAudio = this.scene.sound.add('sword_hit_one_audio');
        this.swordHitTwoAudio = this.scene.sound.add('sword_hit_two_audio');

        // Add running sound effect 
        this.runningOneAudio = this.scene.sound.add('running_one_audio');

        // Just for testing
        this.playNewAnimation('enemyRunning', 'enemy_running_animation');


        // Set starting x position
        this.x = -100;

        //  Set starting y position and set zindex, 
        this.setStartingPosition();


        // Make enemy interactive
        this.setInteractive();


        // Change  bounding box size of enemies
        this.body.setSize(70, 140, true);


        /**
         * Make enemy run by default but only after 4 seconds as 
         * their is text in the GUI we want the player to read
         */
        setTimeout(() => {
            this.enemyRun();
        }, 4000)
    }

    /**
     * This will make the enemy run
     * @param {Default argument is between 10 and 40 but 0 will stop the enemy from moving} speed 
     */
    enemyRun(speed = getRandomNumber(10, 40)) {
        this.playNewAnimation('enemyRunning', 'enemy_running_animation');
        this.body.velocity.x = `+${speed}`;

        /**
         * Stop sword hit sound effect as we don't want it playing 
         * if the enemy runs past the Sandbags
         */
        this.swordHitOneAudio.pause();
        this.swordHitTwoAudio.pause();
    }



    setStartingPosition() {
        /**
        * Set starting y position and set z-index, 
        * this is to stop the enemies overlapping in the wrong order and 
        * will help us when we add our tank traps
        */
        const startingPosition = getRandomNumber(1, 4);
        switch (true) {
            case (startingPosition === 1):
                this.y = 300;
                this.depth = 1;
                break;
            case (startingPosition === 2):
                this.y = 400;
                this.depth = 2;
                break;
            case (startingPosition === 3):
                this.y = 500;
                this.depth = 3;
                break;
            case (startingPosition === 4):
                this.y = 540;
                this.depth = 6;
                break;
        }
    }


    /**
     * This method will allow the enemies to attack
     * the sandbags 
     */
    enemyAttack() {

        /**
         * This method will run inside the update method, 
         * because of this we need to check the state for isEnemyAttacking. The first time 
         * the update method runs this will be false but after that, enemyRun
         *  will not fire because if it does we will not be able to run the 
         * playNewAnimation method as enemyRun will constantly be running. Also
         * check the enemy health is greater that 0 as they can't attack if 
         * they are dead
         */
        if (!this.state.isEnemyAttacking && this.health >= 0) {
            this.enemyRun(0);
        }


        // If enemy is already attacking return (this will happen inside the update method)
        if (this.state.isEnemyAttacking) {
            return;
        }

        this.state.isEnemyAttacking = true;

        const musicConfig = {
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        }

        // play sword hit sound effect
        randomiseAudio([this.swordHitOneAudio, this.swordHitTwoAudio], musicConfig)


        this.playNewAnimation('enemyAttacking', 'enemy_attacking_animation');
    }



    /**
     * This play an new animation and reset the
     * enemy once they are hit by a bullet
     */
    enemyHit() {

        /**
         *  This is to stop the enemy hit animation playing more than once if the 
         * enemy is shot more than one time in quick succession
         */
        if (this.health <= 0) {
            return;
        }

        // Add audio 
        this.bulletHitAudio = this.scene.sound.add('bullet_hit_audio');

        const musicConfig = {
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0
        }

        this.bulletHitAudio.play(musicConfig);




        // Make hitbox temporarily really small , to stop it interacting with the sandbags
        this.body.setSize(1, 1, true);

        // Subtract 100 
        this.health = this.health - 100;

        // Stop the enemy from running 
        this.enemyRun(0);

        // Play the shot in chest animation
        this.playNewAnimation('enemyShotChest', 'enemy_shot_chest_animation');

        // Add fadeout 
        const timeline = this.scene.tweens.createTimeline();

        timeline.add({
            targets: this,
            alpha: 0,
            ease: 'Power1',
            duration: 50
        });
        timeline.add({
            targets: this,
            alpha: 1,
            ease: 'Power1',
            duration: 50
        });

        timeline.add({
            targets: this,
            alpha: 0,
            ease: 'Power1',
            duration: 1000
        });

        // Play fadeout 
        timeline.play();

        // Reset enemy
        this.resetEnemy();
    }



    /**
     * Will reset the enemy health and position
     */
    resetEnemy() {

        // Stop sword hit sound effect
        this.swordHitOneAudio.pause();
        this.swordHitTwoAudio.pause();

        setTimeout(() => {
            // Reset enemy position, health, is they are attacking and make enemy run
            this.setStartingPosition();
            this.x = -100;
            this.health = 100;
            this.state.isEnemyAttacking = false;
            this.enemyRun();

            // Reset hitbox size
            this.body.setSize(70, 140, true);

            /**
             * Set alpha to 1 so we can see the enemy again
             *  but had to use a tween as just setting the alpha to 1
             * (this.alpha = 1) didn't work
             */
            const timeline = this.scene.tweens.createTimeline();
            timeline.add({
                targets: this,
                alpha: 1,
                ease: 'Power1',
                duration: 50
            });
            timeline.play();

        }, 1500);
    }



    /**
   * Note:
   * For performance reasons Phaser won't run the objects 
   * update automatically so, we need to call the update 
   * for each enemy in the main update in the 'Scene 2'
   */
    // update() {
    //     if (this.character.x > 1000) {
    //         this.enemyAttack();
    //     }
    // }

}