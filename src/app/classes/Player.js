
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
            'playerReloading',
            'player_idle_animation',
            'player_walking_animation',
            'player_shooting_animation',
            'player_reloading_animation',
        );

        this.state = {
            isPlayerShooting: false,
            isPlayerReloading: false,
        }

    }


    movePlayer(direction) {
        const player = this.scene.player.character;

        // This will  move the player
        if (direction === 'up') {
            player.setVelocityY(-gameSettings.playerSpeed);
 
            if (!this.state.isPlayerShooting && !this.state.isPlayerReloading) { // if player not shooting or reloading
                this.playNewAnimation('playerWalking', 'player_walking_animation');
            }
        } else if (direction === 'down') {
            player.setVelocityY(gameSettings.playerSpeed);
            if (!this.state.isPlayerShooting && !this.state.isPlayerReloading) { // if player not shooting or reloading
                this.playNewAnimation('playerWalking', 'player_walking_animation');
            }
        } else if (direction === 'stop') {
            player.setVelocityY(0);
            if (!this.state.isPlayerShooting && !this.state.isPlayerReloading) { // if player not shooting or reloading
                this.playNewAnimation('playerIdle', 'player_idle_animation');
            }
        }
    }

    playerShoot() {

        // Do nothing if the player is shooting or reloading
        if (this.state.isPlayerShooting || this.state.isPlayerReloading) {
            return;
        }

        this.state.isPlayerShooting = true;

        // Set timeout so the player can shoot agin after 1 second
        setTimeout(() => {
            this.state.isPlayerShooting = false;
        }, 1000);

        this.playNewAnimation('playerShooting', 'player_shooting_animation', false)

    }


    playerReload() {

        //console.log('playerReload() was fired,' + this.state.isPlayerReloading + this.state.isPlayerShooting)


        // Do nothing if the player is shooting or reloading
        if (this.state.isPlayerShooting || this.state.isPlayerReloading) {
            return;
        }

        this.state.isPlayerReloading = true;

        // Set timeout so the player can reload again after 1 second
        setTimeout(() => {
            this.state.isPlayerReloading = false;
        }, 1000);

        this.playNewAnimation('playerReloading', 'player_reloading_animation', false)

    }

}