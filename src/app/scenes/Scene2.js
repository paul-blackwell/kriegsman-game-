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
        this.player = new Player([config.width - 180, config.height - 200], 'playerIdle', 'player_idle_animation', 100, this);
        this.player.playDefaultAnimation();

        // Make variable to listen for cursor keys
        this.cursorKeys = this.input.keyboard.createCursorKeys();

        //  Make variable to listen for space bar key so player can shoot
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {

        // Shoot gun when spacebar is pressed
        if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
            this.player.playerShoot();
        }



        // Move player on up and down keys
        if (this.cursorKeys.up.isDown && this.player.character.y > 320) {
            this.player.movePlayer('up');
        } else if (this.cursorKeys.down.isDown && this.player.character.y < 540) {
            this.player.movePlayer('down');
        } else {
            this.player.movePlayer('stop');
        }


    }





}