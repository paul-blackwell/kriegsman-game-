import Phaser from 'phaser';

export default class Bullet extends Phaser.GameObjects.Sprite {

    constructor(scene) {

        super(scene, 'bullet', 'bullet_animation');


        this.scene = scene;
        this.player = scene.player.character; // Get player as we will their position
        this.bulletSprite = {};
    }

    shootBullet() {
        const y = this.player.y;
        const x = this.player.x

        /**
         * Add new bullet sprite to the scene but only after 500 milliseconds,
         * as we want the player to shoulder their rifle before firing 
         */
        setTimeout(() => {
            this.bulletSprite = this.scene.physics.add.sprite(x - 100, y - 42, 'bullet');
            this.bulletSprite.play('bullet_animation');
            this.bulletSprite.setInteractive();
            this.bulletSprite.body.velocity.x = -1000;

        /**
        * Add the bullet to the bulletsOnScreen group, 
        * we will use this to later remove the bullet from the scene
        */
        this.scene.bulletsOnScreen.add(this);
        }, 500);
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
        if (this.bulletSprite.x < 1000) {
            this.destroy();
            //this.bulletSprite.destroy()
            console.log('i was fired')
        }
    }

}