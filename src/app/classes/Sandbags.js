import Phaser from 'phaser';

export default class Sandbags extends Phaser.GameObjects.Sprite {

    constructor(scene, health) {
        super(
            scene,
            health,
            'sandbags',
        );

        this.health = health;


        // Add game object to the scene
        scene.add.existing(this)

        // Enable sprite sheet to have physics
        scene.physics.world.enableBody(this);

        /**
         * - Add sprite texture
         * - Set sprite to first frame
         * - set x and y
         * - change hitbox size
         */
        this.setTexture('sandbags')
        this.setFrame(0)
        this.x = 1000;
        this.y = 450;
        this.body.setSize(250, this.hight, true);


        // Make sandbags interactive
        this.setInteractive();

    }

}