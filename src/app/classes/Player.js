
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
            'playerShooting',
            'player_idle_animation',
            'player_walking_animation',
            'player_shooting_animation',
        );

        this.state = {
            isPlayerShooting: false
        }

    }


    movePlayer(direction) {
        const player = this.scene.player.character;

        // This will  move the player
        if (direction === 'up') {
            player.setVelocityY(-gameSettings.playerSpeed);

            if (!this.state.isPlayerShooting) { // if player not shooting
                this.playNewAnimation('playerWalking', 'player_walking_animation');
            }
        } else if (direction === 'down') {
            player.setVelocityY(gameSettings.playerSpeed);
            if (!this.state.isPlayerShooting) { // if player not shooting
                this.playNewAnimation('playerWalking', 'player_walking_animation');
            }
        } else if (direction === 'stop') {
            player.setVelocityY(0);
            if (!this.state.isPlayerShooting) { // if player not shooting
                this.playNewAnimation('playerIdle', 'player_idle_animation');
            }
        }
    }

    playerShoot() {

        // Do nothing if the player is shooting
        if (this.state.isPlayerShooting) {
            return;
        }

        this.state.isPlayerShooting = true;

        setTimeout(() => {
            this.state.isPlayerShooting = false;
        }, 1000);
       
        this.playNewAnimation('playerShooting', 'player_shooting_animation', false)
    
    }

}