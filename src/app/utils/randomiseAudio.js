



/**
 * This function plays an audio track based on an array that is passed in
 * @param {This an array of audio tracks you wish to get a random track from} trackArray 
 * @param {This will be an object that contains the track configuration 
 * for the random audio track that will play, for example if the track loops, 
 * has a delay etc …    } config 
 */
const randomiseAudio = (trackArray,config) => {

    const randomTrack = trackArray[Math.floor(Math.random()*trackArray.length)];
    randomTrack.resume();
    randomTrack.play(config);
}

export default randomiseAudio;