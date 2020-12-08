import Phaser from 'phaser';

export default class AmmoCounter extends Phaser.GameObjects.Sprite {
    constructor(scene) {


        super(scene, 'ammoCounter');



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
        this.setTexture('ammoCounter')
        this.setFrame(0)
        this.x = 1200;
        this.y = 40;
    }

    updateAmmoCount(ammoCount) {
     
        //console.log(ammoCount)

        switch (true) {
            case (ammoCount === 6):
                this.setFrame(0)
                break;
            case (ammoCount === 5):
                this.setFrame(1)
                break;
            case (ammoCount === 4):
                this.setFrame(2)
                break;
            case (ammoCount === 3):
                this.setFrame(3)
                break;
            case (ammoCount === 2):
                this.setFrame(4)
                break;
            case (ammoCount === 1):
                this.setFrame(5)
                break;
            case (ammoCount === 0):
                this.setFrame(6)
                break;
            default:
                this.setFrame(0)
        }
    }

}