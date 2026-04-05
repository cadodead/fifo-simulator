function runSimulation(inputArray){
    let referenceString = inputArray;
    let frames = [];
    let frameLimit = 3;
    let referenceSequence = []; 
    let history = [];  

    for(let i = 0; i < 4; i++){
        let shuffle = [...referenceString].sort(() => 0.5 - Math.random());     
        referenceSequence.push(...shuffle);
        console.log("Shuffle " + (i + 1) + ": " + shuffle.join(", "));
    }

    referenceSequence.forEach(page => {
        if(frames.includes(page)) {
            history.push({
                frames: [...frames],
                type: "hit",
                hitIndex: frames.indexOf(page)
            });
            console.log("*");
        } else if(frames.length < frameLimit) {
            frames.push(page);
            history.push({
                frames: [...frames],
                type: "fault",
                hitIndex: null    
            });
            console.log(page);
        } else {
            frames.shift(); 
            frames.push(page); 
            history.push({
                frames: [...frames],
                type: "fault",
                hitIndex: null    
            })
            console.log(page);
        }
        console.log(history);
    });
    console.log(referenceString);
    return{
        history: history,
        sequence: referenceSequence
    }
}


/*
April 3rd, 2026 notes:
Let reference string, the variable that is connected to our DOM js file, it enables us to input some strings.
Frames in our case has 3 logics, first is the hit logic, usually we ignore this during the first time since the frame is still empty at this point.
It is important to note that frame is an array.
History on the other hand records whether it was a hit or a page fault; it also displays the entire list of arrays.
*/