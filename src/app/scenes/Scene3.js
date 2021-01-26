import Phaser from 'phaser';
import { saveToLocalStorage, getHighScoreFromLocalStorage } from '../requests/requestLocalStorage';

export default class Scene3 extends Phaser.Scene {

    constructor() {
        super('endGame');
        this.state = {
            addedScoreToLocalStorage: false
        }

    }


    init(data) {
        // Get players score 
        this.score = data.score;
    }


    create() {

        /**
         * The create method will run multiple times 
         * but we only want this function to run once
         */
        if (!this.state.addedScoreToLocalStorage) {
            // Save score to  local storage
            saveToLocalStorage(this.score);
            this.state.addedScoreToLocalStorage = true;
        }



        // Set background colour 
        this.cameras.main.setBackgroundColor('#112318');

        // Text for  heading
        this.heading = this.add.bitmapText((this.cameras.main.width / 2) - 70, 140, 'bitmapFont', 'Game over', -24, 'center');
        

        // Text for high Score
        this.highScore = this.add.bitmapText((this.cameras.main.width / 2) - 50, 190, 'bitmapFont', `High score: ${getHighScoreFromLocalStorage()}`, -12);

        // Text for player score) - 70
        this.playerScore = this.add.bitmapText((this.cameras.main.width / 2) - 50, 220, 'bitmapFont', `Your score: ${this.score}`, -12);

        // Text for heading
        this.newGameHeading = this.add.bitmapText((this.cameras.main.width / 2) - 70, 280, 'bitmapFont', 'New Game', -24);

        // Difficulty buttons
        this.difficultyEasyButton = this.add.image(this.cameras.main.width / 2, 360, 'playEasyButton');
        this.difficultyEasyButton.setInteractive({ useHandCursor: true });
        this.difficultyEasyButton.on('pointerdown', () => this.scene.start('playGame', { difficulty: 'easy' }));

        this.difficultyHardButton = this.add.image(this.cameras.main.width / 2, 440, 'playHardButton');
        this.difficultyHardButton.setInteractive({ useHandCursor: true });
        this.difficultyHardButton.on('pointerdown', () => this.scene.start('playGame', { difficulty: 'hard' }));
    }

}