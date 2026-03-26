
function runSimulation(inputArray){//This function was created in 25th of March.

    /* PHASE 1: DATA PREPARATION
Input: 4-letter word (e.g., FACE)
Goal: Generate a 16-character sequence by shuffling the word 4 times.
*/
    let referenceString = inputArray;//I think I made a mistake here. <-- New comment | March 26th
    let frames = [];
    let frameLimit = 3;
    let referenceSequence = []; //March 23rd, I added this. Connecting the shuffle to the logic starts here
    let history = []; //March 24th, I wrote this.

    for(let i = 0; i < 4; i++){
        // Create a randomized version of the original letters
        let shuffle = [...referenceString].sort(() => 0.5 - Math.random());//Why is there '0.5 -' in this snippet?

        // 80/20 Tip: Use spread syntax to push the shuffled letters into our master sequence
        referenceSequence.push(...shuffle);
        console.log("Shuffle " + (i + 1) + ": " + shuffle.join(", "));
    }

    /* PHASE 2: THE FIFO ENGINE
    Logic: First-In, First-Out page replacement.
    March 21st - 22nd: Implementing Hit/Fault detection.
    */
   
    referenceSequence.forEach(page => {
        if(frames.includes(page)) {
            // HIT BRANCH: Page is already in memory.
            // We don't push anything; we just show a Hit with an asterisk.
            console.log("*");
        } else if(frames.length < frameLimit) {
            // FAULT BRANCH (Empty Space): Memory has room.
            frames.push(page); 
            console.log(page);
        } else {
            // FAULT BRANCH (Full): FIFO Eviction happens here.
            // Out with the oldest (index 0), in with the newest (at the back).
            frames.shift(); 
            frames.push(page); 
            console.log(page);
        }
        history.push([...frames]);//
        console.log(history);
    });
    //Marhc 24th, 2026
    // March 24th, 10:18 pm
    console.log(referenceString);
    return history;
}
//March 26th notes below:
//I console.logged the referenceString inside the function, but nothing happened. I sort of see why but it is hazy in my mind and perhaps it has something to do with DOM manipulation.
//Do you even know why you made inputArray a parameter in the first place?
//To use it as an input value, but for what? For the letters
//Reevaluating . . . So our goal here is to be able to use the input and process the it using the logic at fifoVm.js
//But how? 
// fifoVm.js is the logic and ui.js should be the bridge to connect the logic while clicking on buttons, but how?
//The process:
/*
So if I input the value, this could consist of codes such as 
inputs, perhaps conditional statements, a parameter — the parameter on the otherhand, since
this is now a logic inside a function, when we call the parameter which is inputArray, the input should go through the logic inside the function
20 mins of thinking is up.
*/  