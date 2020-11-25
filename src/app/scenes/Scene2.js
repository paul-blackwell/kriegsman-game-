import Phaser from 'phaser';

import config from '../phaser/config';
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
        // Set position[x,y], sprite, animation, health
        // set default sprite and play it
        this.player = new Player([config.width - 180, config.height - 200], 'playerIdle', 'player_idle_Animation', 100, this);
        this.player.setDefaultSprite();
        //this.player = this.physics.add.sprite(config.width - 180, config.height - 200, 'player');
        // this.player.play('player_idle_Animation');

    }

    update() {

    }

}