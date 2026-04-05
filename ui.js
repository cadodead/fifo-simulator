const button = document.querySelector("#runBtn");
const input = document.querySelector("#referenceInput");

button.addEventListener("click", () =>{
    let letter = input.value.split("");
    let result = runSimulation(letter);
    let cells = `<th>Memory Page</th>` + result.sequence.map(p => `<th>${p}</th>`).join("");
    document.querySelector("#output").innerHTML = `<table border="1"><tr>${cells}</tr></table>`;  
    

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
    document.querySelector("#output").innerHTML = `<table border = "1"><tr>${cells}</tr>${frame1Row} ${frame2Row} ${frame3Row}</table>`;
});
    
