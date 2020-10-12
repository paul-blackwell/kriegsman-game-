const config = {
    width: 1280,
    height: 640,
    backgroundColor: 0x000000,
    scene: [Scene1, Scene2],
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    }
}

const gameSettings = {
    playerSpeed: 200,
}




const game = new Phaser.Game(config, gameSettings);