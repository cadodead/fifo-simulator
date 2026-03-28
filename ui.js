// Two goals this evening.
// 1. Get a gist of querySelector
// What's a clickListener?
//---
//The comments above are from March 24, 2026
const button = document.querySelector("#runBtn");
const input = document.querySelector("#referenceInput");


button.addEventListener("click", () =>{
    let letter = input.value.split("");
    let result = runSimulation(letter);
    let cells = result.sequence.map(p => `<th>${p}</th>`).join("");
    document.querySelector("#output").innerHTML = `<table border="1"><tr>${cells}</tr></table>`;

    // This creates: "<th>F</th><th>A</th><th>C</th>..."
    //So basically, what's happening is that. . . we're using the innerHTML to display the HTML tags with the output from the cells, which is likely "F".
});
    //March 28th but let's establish some bearings,
    
    
    
    //Now, try to find out what does 'p' stands for in this .map, so it displays the letter like 'FACE' in the web? 
    //March 28th, 2026  | So I am gonna work after lunch, it's noon now, what are our goals for today? Also! there some minor changes for ui.js since I was  very eager.
    //This is very hard, I might as well write my concerns as well, the prompt I was cooking on how to read codes for learning encouragement was eradicated. . . ts is sad.
    //Plus this is so hard rn, lemme break it down.
    