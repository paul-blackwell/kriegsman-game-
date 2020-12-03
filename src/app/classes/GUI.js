import Phaser from 'phaser';

import AmmoCounter from '../classes/AmmoCounter';

export default class GUI extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(
            scene,
            x,
            y,
            'GUI',
            'commissar',
        );

        this.scene = scene;


        // Add background image
        this.scene.add.image(x, y, 'GUI');


        // Add ammoCount
        this.ammoCounter = new AmmoCounter(this.scene);


        // Add commissar
        this.addCommissar();
        this.addCurrentAmmoText();

        // Add score text
        this.currentScoreText = this.scene.add.text(610, 30, 'Score:', { fill: '#0f0' });

    }


    // This will load the image of the commissar and text
    addCommissar() {
        this.commissarImage = this.scene.add.image(290, 62, 'commissar');

        // Text for  'Select difficulty:'
        this.commissarHeading = this.scene.add.text(30, 30, 'Commissar-General Maugh:', { fill: '#0f0' });
        this.commissarText1 = this.scene.add.text(30, 60, '"Hold out as long \n as you can..."', { fill: '#0f0' });
        this.commissarText2 = this.scene.add.text(30, 60, '"your death will not \n be in vain"', { fill: '#0f0' });

        // Set alpha to 0
        this.commissarImage.alpha = 0;
        this.commissarHeading.alpha = 0;
        this.commissarText1.alpha = 0;
        this.commissarText2.alpha = 0;


        // Add fadeoutIn
        const timeline = this.scene.tweens.createTimeline();

        timeline.add({
            targets: this.commissarImage,
            alpha: 1,
            ease: 'Power1',
            duration: 1000
        });

        timeline.add({
            targets: this.commissarHeading,
            alpha: 1,
            ease: 'Power1',
            duration: 1000
        });

        timeline.add({
            targets: this.commissarText1,
            alpha: 1,
            ease: 'Power1',
            duration: 1000
        });

        timeline.add({
            targets: this.commissarText1,
            alpha: 0,
            ease: 'Power1',
            duration: 1000
        });

        timeline.add({
            targets: this.commissarText2,
            alpha: 1,
            ease: 'Power1',
            duration: 1000
        });

        // Play fadeout 
        timeline.play();

    }


    addCurrentAmmoText() {
        this.currentAmoText = this.scene.add.text(1030, 30, 'Ammunition:', { fill: '#0f0' });
    }





    update(ammoCount, score) {
        // Update ammo counter count, this will update the bullets shown on the counter
        this.ammoCounter.updateAmmoCount(ammoCount);

        // Update score text
        this.currentScoreText.setText(`Score:\n\n${score}`);

    }
}