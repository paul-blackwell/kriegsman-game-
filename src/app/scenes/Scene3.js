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



        // Just for testing
        this.cameras.main.setBackgroundColor('#040C06');

        // Text for  heading
        this.heading = this.add.text(100, 100, 'Game over', { fill: '#0f0' });


        // Text for high Score
        this.highScore = this.add.text(100, 130, `High score: ${getHighScoreFromLocalStorage()}`, { fill: '#0f0' });

        // Text for  player score
        this.playerScore = this.add.text(100, 160, `Your score: ${this.score}`, { fill: '#0f0' });

    }

}