
import Character from '../classes/Character';
import gameSettings from '../phaser/gameSettings';
import Bullet from '../classes/Bullet'


export default class Player extends Character {

    constructor(scene) {

        /**
         * Note we are also inheriting the animations from the scene,
         * as we have already preloaded them 
         */
        super(
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

        // Set state
        this.state = {
            isPlayerShooting: false,
            isPlayerReloading: false,
            playerAmmunitionCount: 5,
        }

        // Add game object to the scene
        scene.add.existing(this)

        // Add physics
        scene.physics.world.enableBody(this);

        // Set starting position
        this.x = 1180;
        this.y = 400;

        // Make enemy interactive
        this.setInteractive();


        this.scene = scene;
    }




    /**
     * This method will move the player up and down the Y axis
     * and update their animation depending on if they are moving or not
     * @param {A string (up, down or stop) used to set the direction the player will move in} direction 
     */
    movePlayer(direction) {

        // This will  move the player
        if (direction === 'up') {
            this.body.setVelocityY(-gameSettings.playerSpeed);

            if (!this.state.isPlayerShooting && !this.state.isPlayerReloading) { // if player not shooting or reloading
                this.playNewAnimation('playerWalking', 'player_walking_animation');
            }
        } else if (direction === 'down') {
            this.body.setVelocityY(gameSettings.playerSpeed);
            if (!this.state.isPlayerShooting && !this.state.isPlayerReloading) { // if player not shooting or reloading
                this.playNewAnimation('playerWalking', 'player_walking_animation');
            }
        } else if (direction === 'stop') {
            this.body.setVelocityY(0);
            if (!this.state.isPlayerShooting && !this.state.isPlayerReloading) { // if player not shooting or reloading
                this.playNewAnimation('playerIdle', 'player_idle_animation');
            }
        }
    }



    /**
     * This will allow the player to shot 
     */
    playerShoot() {

        // Do nothing if the player is shooting or reloading
        if (this.state.isPlayerShooting || this.state.isPlayerReloading) {
            return;
        }

        // Check player amo count, if 0 reload and break out of this method 
        if (this.state.playerAmmunitionCount === 0) {
            this.playerReload();
            return;
        }


        // Set isPlayerShooting to true
        this.state.isPlayerShooting = true;

        // Subtract one from the amo count
        this.state.playerAmmunitionCount--;


        /**
       *  Add new bullet but after 500 milliseconds as we want the player to shoulder the rifle
       */
        setTimeout(() => {
            this.bullet = new Bullet(this.scene, this.x, this.y);
        }, 500)

        // Set timeout so the player can shoot agin after 1 second
        setTimeout(() => {
            this.state.isPlayerShooting = false;
        }, 1000);

        // Add player shooting animation 
        this.playNewAnimation('playerShooting', 'player_shooting_animation', false)

    }


     /**
     * This will allow the player to reload
     */
    playerReload() {

        // Do nothing if the player is shooting or reloading
        if (this.state.isPlayerShooting || this.state.isPlayerReloading) {
            return;
        }

        // Set isPlayerReloading to true
        this.state.isPlayerReloading = true;

        // Reset playerAmmunitionCount to 5
        this.state.playerAmmunitionCount = 5;


        // Set timeout so the player can reload again after 1 second
        setTimeout(() => {
            this.state.isPlayerReloading = false;
        }, 1000);

        this.playNewAnimation('playerReloading', 'player_reloading_animation', false)
    }

}