import Phaser from 'phaser';

export default class Bullet extends Phaser.GameObjects.Sprite {


    constructor(scene, x, y) {


        super(scene, x, y, 'bullet');

        

        // Add game object to the scene
        scene.add.existing(this)


        /**
         * Play Bullet animation
         * Enable sprite sheet to have physics
         */
        this.play('bullet_animation');
        scene.physics.world.enableBody(this);

        // Make enemy interactive
        this.setInteractive();

        

        // Set the bullets position just above the players rifle
        this.x = x - 100;
        this.y = y - 50;


        // Set the bullets velocity so it moves across the screen
        this.body.velocity.x = -1000;


        /**
         * Add the bullet to the activeBullets array, 
         * we will use this to later remove the bullet from the scene
         */
        scene.activeBullets.push(this)
        
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
        if (this.x < 100) {
            this.destroy();
        }
    }

}