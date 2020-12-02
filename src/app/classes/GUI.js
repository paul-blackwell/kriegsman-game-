import Phaser from 'phaser';

export default class GUI extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, amoCount) {
        super(
            scene,
            x,
            y,
            amoCount,
            'GUI',
            'commissar',
        );

        this.scene = scene;

        // Add background image
        this.scene.add.image(x, y, 'GUI');



        this.addCommissar();
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
        this.commissarText1.alpha = 0;


        // Add fadeoutIn
        const timeline = this.scene.tweens.createTimeline();

        timeline.add({
            targets: this.commissarImage,
            alpha: 1,
            ease: 'Power1',
            duration: 1000
        });

        timeline.add({
            targets:  this.commissarHeading,
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

    currentScore(){
        
    }
}