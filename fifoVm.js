/* PHASE 1: DATA PREPARATION
Input: 4-letter word (e.g., FACE)
Goal: Generate a 16-character sequence by shuffling the word 4 times.
*/

let referenceString = ["F", "A", "C", "E"]; 
let frames = [];
let frameLimit = 3;
let referenceSequence = []; // Connecting the shuffle to the logic starts here. March 23rd started here.


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
});