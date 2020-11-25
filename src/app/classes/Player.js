
import Character from './Character';
import gameSettings from '../phaser/gameSettings';

export default class Player extends Character {
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
            'playerIdle',
            'playerWalking',
            'player_idle_animation',
            'player_walking_animation',
        );

    }


    movePlayer(direction) {
        const player = this.scene.player.character;

    
        // This will  move the player
        if (direction === 'up') {
            player.setVelocityY(-gameSettings.playerSpeed);
            this.playNewAnimation('playerWalking', 'player_walking_animation')
        } else if (direction === 'down') {
            player.setVelocityY(gameSettings.playerSpeed);
            this.playNewAnimation('playerWalking', 'player_walking_animation')
        } else if (direction === 'stop') {
            player.setVelocityY(0);
            this.playNewAnimation('playerIdle', 'player_idle_animation')
        }
    }

}