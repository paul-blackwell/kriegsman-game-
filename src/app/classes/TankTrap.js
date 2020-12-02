
import Phaser from 'phaser';
import getRandomNumber from '../utils/getRandomNumber';


export default class TankTrap extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y) {
        super(
            scene,
            x,
            y,
            'tankTrap',
        );


        // Add game object to the scene
        scene.add.existing(this);

        // Enable sprite sheet to have physics
        scene.physics.world.enableBody(this);


        /**
         * Add sprite texture
         */
        this.setTexture('tankTrap')

        /**
         * Set frame base on a random number, this will change the sprite
         * to one of four images at random (so they don't all look the same)
         */
        this.setFrame(getRandomNumber(0,3));

        /**
         * Set tank trap position
         */
        this.x = x;
        this.y = y;


        // Change the zIndex based on the y axis 
        // switch (true) {
        //     case (this.y < 300):
        //         this.depth = -1;
        //         break;
        //     case (this.y < 350):
        //         this.depth = 1;
        //         break;
        //     case (this.y < 400):
        //         this.depth = 2;
        //         break;
        //     case (this.y < 450):
        //         this.depth = 3;
        //         break;
        //     case (this.y < 500):
        //         this.depth = 4;
        //         break;
        //     case (this.y < 550):
        //         this.depth = 5;
        //         break;
        // }

        const startingPosition = getRandomNumber(1, 4);
        switch (true) {
            case (startingPosition === 1):
                this.y = 300;
                this.depth = 1;
                break;
            case (startingPosition === 2):
                this.y = 400;
                this.depth = 2;
                break;
            case (startingPosition === 3):
                this.y = 500;
                this.depth = 3;
                break;
            case (startingPosition === 4):
                this.y = 540;
                this.depth = 4;
                break;
        }

    }
}