import Phaser from 'phaser';
import config from './config';


const gameSettings = {
    playerSpeed: 200,
}

const game = new Phaser.Game(config, gameSettings);

export default game;