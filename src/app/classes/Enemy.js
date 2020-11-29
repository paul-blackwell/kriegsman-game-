import Character from './Character';

import getRandomNumber from '../utils/getRandomNumber';

export default class Enemy extends Character {


    constructor(position, defaultSprite, defaultAnimation, health, scene) {

        /**
         * Note we are also inheriting the animations from the scene,
         * as we have already preloaded them 
         */
        super(
            position,
            defaultSprite,
            defaultAnimation,
            health,
            scene,
            'enemyRunning',
            'enemyAttacking',
            'enemyShotChest',
            'enemy_running_animation',
            'enemy_attacking_animation',
            'enemy_shot_chest_animation',
        );


        this.scene = scene;
        this.position = position;

        this.state = {
            isEnemyAttacking: false
        }

        /**
         * This will stop the enemy from overlapping other enemies depending on 
         * its y axis (looks bad if we don't do this)
         */

        const y = this.position[1];
        switch (true) {
            case (y < 300):
                this.character.depth = 0;
                break;
            case (y < 350):
                this.character.depth = 1;
                break;
            case (y < 400):
                this.character.depth = 2;
                break;
            case (y < 450):
                this.character.depth = 3;
                break;
            case (y < 500):
                this.character.depth = 4;
                break;
            case (y < 550):
                this.character.depth = 5;
                break;
        }


        // Change  bounding box size of enemies
        this.character.setSize(70, 140, true);

        // Make enemy interactive
        this.setInteractive();

    }

    enemyRun(speed = getRandomNumber(10, 40)) {
        this.playNewAnimation('enemyRunning', 'enemy_running_animation');

        this.character.body.velocity.x = `+${speed}`;
    }


    enemyAttack() {

        /**
         * Because this method will run inside the update method, 
         * we need to check the state for isEnemyAttacking. The first time 
         * the update method runs this will be false but after that, enemyRun
         *  will not fire because if it does we will not be able to run the 
         * playNewAnimation method as enemyRun will constantly be running. Also
         * check the enemy health is greater that 0  as they can't attack if 
         * they are dead
         */
        if (!this.state.isEnemyAttacking && this.health > 0) {
            this.enemyRun(0);
        }


        // If enemy is already attacking return (this will happen inside the update method)
        if(this.state.isEnemyAttacking) {
            return;
        }

        this.state.isEnemyAttacking = true;

        this.playNewAnimation('enemyAttacking', 'enemy_attacking_animation');

    }



    enemyHit() {

        // Subtract 100 
        this.health - 100;

        /**
         *  Run a check on the health, doing it this way as we 
         * might want to make the enemy go down in more than one shot in the future 
         */

        if (this.health === 0) {
            // this.playNewAnimation('enemyShotChest', 'enemy_shot_chest_animation');
        }
        this.playNewAnimation('enemyShotChest', 'enemy_shot_chest_animation');

        // Add fadeout 
        const timeline = this.scene.tweens.createTimeline();

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

    }




    /**
   * Note:
   * For performance reasons Phaser won't run the objects 
   * update automatically so, we need to call the update 
   * for each 'beam in the main update in the 'Scene 2'
   */
    update() {

        if (this.character.x > 1000) {
            this.enemyAttack();
        }
    }

}