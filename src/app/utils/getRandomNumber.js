/**
   * Title: Generating random whole numbers in JavaScript in a specific range
   * Author: Lior Elrom
   * Date: 20 October 2020
   * Code version: 1.0
   * Availability: https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
   * 
   */
// This will be used to set the start enemy positions
const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default getRandomNumber;