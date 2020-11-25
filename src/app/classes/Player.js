
import Character from './Character';
import gameSettings from '../phaser/gameSettings';

export default class Player extends Character {
    constructor(position, defaultSprite, defaultAnimation, health, scene) {


        /**
         * Note we are also inheriting the animations from the scene,
         * as we have already preloaded them 
         */
        super(position, defaultSprite, defaultAnimation, health, scene);
        this.position = position;
       
    }


    movePlayer(direction) {

        const player =  this.scene.player.character;

        if (direction === 'up') {
            player.setVelocityY(-gameSettings.playerSpeed);
        } else if (direction === 'down'){
            player.setVelocityY(gameSettings.playerSpeed);
        } else if (direction === 'stop') {
            player.setVelocityY(0)
        }
    }

}