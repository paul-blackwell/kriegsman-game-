
import Character from './Character';
import gameSettings from '../phaser/gameSettings';

import Bullet from '../classes/Bullet'

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
        this.scene = scene;

    }


    movePlayer(direction) {

        // This will  move the player
        if (direction === 'up') {
            this.character.setVelocityY(-gameSettings.playerSpeed);

            if (!this.state.isPlayerShooting && !this.state.isPlayerReloading) { // if player not shooting or reloading
                this.playNewAnimation('playerWalking', 'player_walking_animation');
            }
        } else if (direction === 'down') {
            this.character.setVelocityY(gameSettings.playerSpeed);
            if (!this.state.isPlayerShooting && !this.state.isPlayerReloading) { // if player not shooting or reloading
                this.playNewAnimation('playerWalking', 'player_walking_animation');
            }
        } else if (direction === 'stop') {
            this.character.setVelocityY(0);
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


        // Set isPlayerShooting to true
        this.state.isPlayerShooting = true;

        // Get player x and y position
        const playerX = this.character.x;
        const playerY = this.character.y;

        /**
       *  Add new bullet but after 500 milliseconds as we want the player to shoulder the rifle
       */
        setTimeout(() => {
            this.bullet = new Bullet(this.scene, playerX, playerY);
        }, 500)

        // Set timeout so the player can shoot agin after 1 second
        setTimeout(() => {
            this.state.isPlayerShooting = false;
        }, 1000);

        // Add player shooting animation 
        this.playNewAnimation('playerShooting', 'player_shooting_animation', false)

    }


    playerReload() {


        // Do nothing if the player is shooting or reloading
        if (this.state.isPlayerShooting || this.state.isPlayerReloading) {
            return;
        }

        // Set isPlayerReloading to true
        this.state.isPlayerReloading = true;


        // Set timeout so the player can reload again after 1 second
        setTimeout(() => {
            this.state.isPlayerReloading = false;
        }, 1000);

        this.playNewAnimation('playerReloading', 'player_reloading_animation', false)
    }

}