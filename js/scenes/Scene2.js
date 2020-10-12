class Scene2 extends Phaser.Scene {

    constructor() {
        super('playGame');
    }

    create() {
       // Add player image for testing
       this.player = this.add.image(config.width/ 2 - 50, config.height/ 2, 'player')
    }


}