import Phaser from 'phaser';
import config from './config';
import gameSettings from './gameSettings';


const game = new Phaser.Game(config, gameSettings);

export default game;