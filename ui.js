const button = document.querySelector("#runBtn");
const input = document.querySelector("#referenceInput");

button.addEventListener("click", () =>{
    let letter = input.value.split("");//Splits the array into individual elements
    let result = runSimulation(letter);//First is that letter contains the logic of spliiting arrays into individual elements, runSim is a large function that produces arrays of string?
    let cells = `<th>Memory Page</th>` + result.sequence.map(p => `<th>${p}</th>`).join("");//cells serve as the contianer for individual elements that came from 'result', the logic inside .map says: "each p (page) will turn into a <th>"", honestly idk what it meant by .join("")
    document.querySelector("#output").innerHTML = `<table border="1"><tr>${cells}</tr></table>`;//we then pass the cells into the "output", and it will display as the shuffled letters aligned into a horizontal line.  
    

    let frame1Row = `<tr><td>1.</td>${result.history.map((step, index) => {
        if(step.type === "hit" && step.hitIndex === 0){
            return `<td>*</td>`;
        }else if(step.type === "hit"){
            return `<td></td>`
        }else if(step.frames[0] !== undefined){
            let prev = result.history[index - 1];
            if(!prev || prev.frames[0] !== step.frames[0]){
                return `<td>${step.frames[0]}</td>`
            }
            return `<td></td>`
        }else{
            return `<td></td>`
        }
    }).join("")}</tr>`
    
    
     let frame2Row = `<tr><td>2.</td>${result.history.map((step, index) => {
        if(step.type === "hit" && step.hitIndex === 1){
            return `<td>*</td>` 
        }else if(step.type === "hit"){
            return `<td></td>`
        }else if(step.frames[1] !== undefined){
            let prev = result.history[index - 1];
            if(!prev || prev.frames[1] !== step.frames[1]){
                return `<td>${step.frames[1]}</td>`
            }
            return `<td></td>`
        }else{
            return `<td></td>`
        }
    }).join("")}</tr>`

    let frame3Row = `<tr><td>3.</td>${result.history.map((step, index) => {
        if(step.type === "hit" && step.hitIndex === 2){
            return `<td>*</td>`
        }else if(step.type === "hit"){
            return `<td></td>`
        }else if(step.frames[2] !== undefined){
            let prev = result.history[index - 1];
            if(!prev || prev.frames[2] !== step.frames[2]){
                return `<td>${step.frames[2]}</td>`
            }
            return `<td></td>`
        }else{
            return `<td></td>`
        }
    }).join("")}</tr>`
    document.querySelector("#output").innerHTML = `<table border = "1"><tr>${cells}</tr>${frame1Row} ${frame2Row} ${frame3Row}</table>`;//I tried removing the "<tr>", nothing's change.
});
// Next problem that has risen was the frames missing on table at the end of each Frame
    
