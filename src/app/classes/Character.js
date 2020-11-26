import Phaser from 'phaser';

export default class Character extends Phaser.GameObjects.Sprite {

    constructor(position, defaultSprite, defaultAnimation, health, scene) {

        super(scene);

        // Add game object to the scene
        scene.add.existing(this);

        this.position = position;
        this.sprite = defaultSprite;
        this.animation = defaultAnimation;
        this.health = health;
        this.scene = scene;
        this.character = this.scene.physics.add.sprite(this.position[0], this.position[1], this.sprite);
    }

    //set default sprite and play it
    playDefaultAnimation() {
        // const character = this.scene.physics.add.sprite(this.position[0], this.position[1], this.sprite);
        // character.play(`${this.animation}`);
        this.character.play(`${this.animation}`);
    }


    // This method won't be used here, but will be inherited by child classes 
    playNewAnimation(texture, animation, playOnce = true) {
    
        /**
         * check if animation if already playing if so do nothing,
         * and if we only want to play in once
         */
        if(this.character.texture.key === texture && playOnce) {
            return;
        }

        this.character.setTexture(texture);
        this.character.play(animation);
    }


}