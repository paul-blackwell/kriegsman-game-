


const saveToLocalStorage = (score) => {


    // If no scores have been saved to local storage make new array in local storage
    if (localStorage.getItem('savedScores') === null || localStorage.getItem('savedScores') === "") {
        const newSavedScores = [];
        localStorage.setItem('savedScores', JSON.stringify(newSavedScores));
    }

    // Get current saved scores and push score to it
    const currentSavedScores = JSON.parse(localStorage.getItem('savedScores'));
    currentSavedScores.push(score);


    // Then add to local storage
    localStorage.setItem('savedScores', JSON.stringify(currentSavedScores));

}


const getHighScoreFromLocalStorage = () => {
     // Get current saved scores and push score to it
     const savedScores = JSON.parse(localStorage.getItem('savedScores'));


     // Return highest number in savedScores array
     return (Math.max(...savedScores))

}


export { saveToLocalStorage, getHighScoreFromLocalStorage }; 