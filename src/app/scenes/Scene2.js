import Phaser from 'phaser';

import config from '../phaser/config';
import Player from '../classes/Player';
import Enemy from '../classes/Enemy';

import getRandomNumber from '../utils/getRandomNumber';

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

        //  Make variable to listen for "R" key so player can reload
        this.rKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        // This will hold all the 'beam' Instances in the scene 
        this.bulletsOnScreen = this.add.group();

        // Make enemies using the makeEnemies method based on difficulty
        this.enemies = this.makeEnemies(this.difficulty);


    }

    makeEnemies(difficulty) {
        // this.enemy.playDefaultAnimation();

        // Make enemies group
        const enemies = this.physics.add.group();


        const makeEnemiesGroup = (numberOfEnemies) => {
            for (let i = 0; i < numberOfEnemies; i++) {

                // Set position[x,y], defaultSprite, defaultAnimation, health, scene
                const enemy = new Enemy([100, getRandomNumber(250, 550)], 'enemyIdle', 'enemy_idle_animation', 100, this);
                enemy.enemyRun();
                enemies.add(enemy)
            }
        }

        if (difficulty === 'easy') {
            makeEnemiesGroup(3);
        } else if (difficulty === 'hard') {
            makeEnemiesGroup(5);
        }

        return enemies;

    }

    update() {

        // Shoot gun when spacebar is pressed
        if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
            this.player.playerShoot();
        }

        // Reload gun when "r" key is pressed 
        if (Phaser.Input.Keyboard.JustDown(this.rKey)) {
            this.player.playerReload();
        }



        // Move player on up and down keys
        if (this.cursorKeys.up.isDown && this.player.character.y > 320) {
            this.player.movePlayer('up');
        } else if (this.cursorKeys.down.isDown && this.player.character.y < 540) {
            this.player.movePlayer('down');
        } else {
            this.player.movePlayer('stop');
        }




        /**
         * Run the update of each bullet instance (they are stored 
         * in the bulletsOnScreen group). This will destroy them once they
         * get 50px from the left edge of the screen. 
         * If we don't do this each bullet will cause performance problems as 
         * they will go on forever.
         * 
         * check note on Bullet classes update method for more info 
         */
        for (let i = 0; i < this.bulletsOnScreen.getChildren().length; i++) {
            const bullet = this.bulletsOnScreen.getChildren()[i];
            bullet.update();
        }



        for (let i = 0; i < this.enemies.getChildren().length; i++) {
            const enemy =this.enemies.getChildren()[i];
            enemy.update();
        }



    }





}