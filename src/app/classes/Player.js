
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


         // This function checks to see if the Textures have already been set
        const playWalkingAnimation = (play) => {
            if (player.texture.key !== 'playerWalking' && play) {
                player.setTexture('playerWalking');
                player.play('player_walking_animation');
            } else if (player.texture.key !== 'playerIdle' && !play) {
                player.setTexture('playerIdle');
                player.play('player_idle_animation');
            }
        }

        // This will  move the player
        if (direction === 'up') {
            player.setVelocityY(-gameSettings.playerSpeed);
            playWalkingAnimation(true);
        } else if (direction === 'down') {
            player.setVelocityY(gameSettings.playerSpeed);
            playWalkingAnimation(true);
        } else if (direction === 'stop') {
            player.setVelocityY(0);
            playWalkingAnimation(false);
        }
    }

}