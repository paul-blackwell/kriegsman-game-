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
            'enemy_running_animation',
            'enemy_attacking_animation',
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

    enemyRun(speed = getRandomNumber(10,40)) {
        this.playNewAnimation('enemyRunning', 'enemy_running_animation');

        //this.character.x += speed;

        //const randomSpeed  = getRandomNumber(10,20);
        //this.character.body.velocity.x = `+${randomSpeed}`;
        this.character.body.velocity.x = `+${speed}`;
    }


    enemyAttack() {

        if(!this.state.isEnemyAttacking){
            this.enemyRun(0);
        }

        this.state.isEnemyAttacking = true;
        this.playNewAnimation('enemyAttacking', 'enemy_attacking_animation');
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