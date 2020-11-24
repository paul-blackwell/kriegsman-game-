
export default class Character {

    constructor(position, sprite, animation){
        this.position = position;
        this.sprite = sprite;
        this.animation = animation;
    }

    setDefaultSprite() {
        this.physics.add.sprite(config.width - 180, config.height - 200, this.sprite);
        this.player.play(this.animation);
    }
}