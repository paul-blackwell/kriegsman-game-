import Phaser from 'phaser';

export default class Sandbags extends Phaser.GameObjects.Sprite {

    constructor(scene, health) {
        super(
            scene,
            health,
            'sandbags',
        );

        this.scene = scene;
        this.health = health;
        this.state = {
            sandbagsFadedOut: false
        }

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
        this.body.setSize(200, this.hight, true);


        // Make sandbags interactive
        this.setInteractive();

    }



    updateSandBagTexture() {
        const health = this.health;

        switch (true) {
            case (health < 100 && health > 80):
                this.setFrame(1)
                break;
            case (health < 80 && health > 60):
                this.setFrame(2)
                break;
            case (health < 60 && health > 40):
                this.setFrame(3)
                break;
            case (health < 20 && health > 1):
                this.setFrame(4)
                break;
            case (health < 1 && !this.state.sandbagsFadedOut):
                this.state.sandbagsFadedOut = true;

                // Add fadeout 
                const timeline = this.scene.tweens.createTimeline();

                timeline.add({
                    targets: this,
                    alpha: 0,
                    ease: 'Power1',
                    duration: 1000
                });

                // Play fadeout 
                timeline.play();

                console.log('should only fire one time')
                break;
        }
    }



    damageSandBags() {
        /**
         * If sandbags have no heath and
         * break out of this method 
         */
        if (this.health <= 0) {
            return;
        }

        // Update texture
        this.updateSandBagTexture();

        // Remove - 0.1 from the health 
        this.health = this.health - 0.1;
    }

}