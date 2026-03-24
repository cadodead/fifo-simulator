// Two goals this evening | March 24, 2026
// 1. Get a gist of querySelector
// What's a clickListener?

const button = document.querySelector("#runBtn");
button.addEventListener("click", () =>{
    console.log("clicked!");
})
//So I tried clicking the button, and it consoled "clicked!". 

const input = document.querySelector("#referenceInput");
button.addEventListener("click", () =>{
    console.log(input.value);//Why use an undefined value?
}) 
//---
//Session end, should I use git here?