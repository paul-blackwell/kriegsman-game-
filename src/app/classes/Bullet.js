import Phaser from 'phaser';

export default class Bullet extends Phaser.GameObjects.Sprite {


    constructor(scene) {

        /** 
         * Get the position of the players ship as
         * we want the beam to positioned where the ship is
         * */

        const x = scene.player.character.x;
        const y = scene.player.character.y;

        super(scene, x, y, 'bullet');




        // Add game object to the scene
        scene.add.existing(this)

        /**
         * Play Beam animation
         * Enable sprite sheet to have physics
         */
        this.play('bullet_animation');
        scene.physics.world.enableBody(this);


    
        this.body.x = x - 100;
        this.body.y = y - 60;

        
        this.body.velocity.x = -250;

        /**
         * Add the beam to the projectiles group, 
         * we will use this to later remove the beam from the scene
         */
        scene.bulletsOnScreen.add(this);
    }




    /**
     * Note:
     * For performance reasons Phaser won't run the objects 
     * update automatically so, we need to call the update 
     * for each 'beam in the main update in the 'Scene 2'
     */
    update() {

        /**
         * If instance of the bullet reaches 50px from the left 
         * edge of the screen destroy it.We need to this because 
         * if me don't it will cause performance
         * problems
         */
        // was 50
        if (this.body.x < 50) {
            this.destroy();
        }
    }

}