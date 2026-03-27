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
    document.querySelector("#output").innerHTML = result.sequence.map(p => `<th>${p}</th>`).join("");//Now, try to find out what does 'p' stands for in this .map, so it displays the letter like 'FACE' in the web? 
})



//Session: March 25th, 2026, Goals for an hour session?
// What needs to replace the referenceString exactly?
// window.prompt?
//---
//Marhc 26th
//Time for a March 27th Progress! an hour progress.
