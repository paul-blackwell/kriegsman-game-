import Scene1 from '../scenes/Scene1';
import Scene2 from '../scenes/Scene2';
import Scene3 from '../scenes/Scene3';

const config = {
    width: 1280,
    height: 640,
    backgroundColor: 0x000000,
    scene: [Scene1, Scene2, Scene3],
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    }
}

export default config;