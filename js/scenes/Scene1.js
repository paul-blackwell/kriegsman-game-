class Scene1 extends Phaser.Scene {

    constructor() {
        super('bootgame');
    }

    // Preload all Images an spites 
    preload(){
        this.load.image('player', 'assets/images/krieg-guardsman2.png');
    }

    create() {
        this.add.text(20, 20, "Loading game... ");
        this.scene.start('playGame');
    }


}