import Character from './Character';

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
        );


        this.scene = scene;
        this.position = position;

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

    }




}