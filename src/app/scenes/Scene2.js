import Phaser from 'phaser';

import config from '../phaser/config';
import gameSettings from '../phaser/gameSettings';
import Player from '../classes/Player';

export default class Scene2 extends Phaser.Scene {

    constructor() {
        super('playGame');
    }

    init(data) {
        // Get difficulty from scene one
        this.difficulty = data.difficulty;
    }

    create() {

        // Add background
        this.background = this.add.image(this.cameras.main.width / 2, config.height - 520, 'background');

        // Add foreground
        this.foreground = this.add.image(this.cameras.main.width / 2, config.height - 205, 'foreground');

        // Add player
        // Set position[x,y], defaultSprite, defaultAnimation, health, scene
        // set default sprite and play it
        this.player = new Player([config.width - 180, config.height - 200], 'playerIdle', 'player_idle_Animation', 100, this);
        this.player.playDefaultAnimation();


    
        // Make variable to listen for cursor keys
        this.cursorKeys = this.input.keyboard.createCursorKeys();
    }

    update() {


    // Move player on up down key
    if (this.cursorKeys.up.isDown) {
        this.player.movePlayer('up');
    } else if (this.cursorKeys.down.isDown) {
        this.player.movePlayer('down');
    } else {
        this.player.movePlayer('stop')
    }
     
        
    }


   

}