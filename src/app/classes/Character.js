import Phaser from 'phaser';

export default class Character extends Phaser.GameObjects.Sprite {

    
    /**
     * This method won't be used here, but will be inherited by child classes 
     * @param {Will be used to set the texture of the animation} texture 
     * @param {The name of the animation you want to play} animation 
     * @param {If the animation is playing more than onces, as this method may be used in the update function =} playOnce 
     */
    playNewAnimation(texture, animation, playOnce = true) {
    
        /**
         * check if animation if already playing if so do nothing,
         * and if we only want to play in once as this might be ran in
         * a update method 
         */
        if(this.texture.key === texture && playOnce) {
            return;
        }

        this.setTexture(texture);
        this.play(animation);
    }


}