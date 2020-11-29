import Scene1 from '../scenes/Scene1';
import Scene2 from '../scenes/Scene2';

const config = {
    width: 1280,
    height: 640,
    backgroundColor: 0x000000,
    scene: [Scene1, Scene2],
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    }
}

export default config;