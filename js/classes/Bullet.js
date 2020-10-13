
class Bullet extends Phaser.GameObjects.Sprite {
    constructor(scene){

         /** 
         * Get the position of the player as
         * we want the beams starting position to start from the player
         **/ 
        const x = scene.player.x - 60;
        const y = scene.player.y - 45;

        
        super(scene, x, y, 'bullet');

        // Add game object to the scene
        scene.add.existing(this)

         /**
         * Play Bullet animation
         * Enable sprite sheet to have physics
         * Set velocity of beam to go upwards
         */
        this.play('bullet_anim');
        scene.physics.world.enableBody(this);
        this.body.velocity.x = -1000;

        /**
         * Add the beam to the projectiles group, 
         * we will use this to later remove the beam from the scene
         */
        scene.projectiles.add(this);
    }
}