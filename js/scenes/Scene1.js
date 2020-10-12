class Scene1 extends Phaser.Scene {

    constructor() {
        super('bootgame');
    }

    preload(){

    }

    create() {
        this.add.text(20, 20, "Loading game... ");
    }


}