import Phaser from 'phaser';

export default class Character extends Phaser.GameObjects.Sprite {

    constructor(position, sprite, animation, health, scene) {

        super(scene,'player_idle_Animation');

        // Add game object to the scene
        scene.add.existing(this)

        this.position = position;
        this.sprite = sprite;
        this.animation = animation;
        this.health = health;
        this.scene = scene;
    }

    //set default sprite and play it
    setDefaultSprite() {
        const player = this.scene.physics.add.sprite(this.position[0], this.position[1], this.sprite);
        player.play('player_idle_Animation');
        //this.player.play(this.animation);
        //this.play('player_idle_Animation');
    }
}