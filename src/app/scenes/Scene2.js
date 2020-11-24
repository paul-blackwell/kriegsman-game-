import Phaser from 'phaser';

import config from '../phaser/config';

export default class Scene2 extends Phaser.Scene {

    constructor() {
        super('playGame');
    }

    create() {

        // Add background
        this.background = this.add.image(this.cameras.main.width / 2, config.height - 520, 'background');

    }

    update() {

    }

}