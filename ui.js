// Two goals this evening.
// 1. Get a gist of querySelector
// What's a clickListener?
//---
//The comments above are from March 24, 2026
const button = document.querySelector("#runBtn");
const input = document.querySelector("#referenceInput");
button.addEventListener("click", () =>{
    console.log(input.value);
    console.log("clicked!");
})

//Session: March 25th, 2026, Goals for an hour session?
// What needs to replace the referenceString exactly?
// window.prompt?