 //ui.js — The Face of the FIFO Simulator
// This file handles everything the user sees and interacts with.
// It reads the input, calls the logic in fifoVm.js,
// and builds the results table on screen.
// Built: March 24 – April 6, 2026

// Grab the button and input field from the HTML by their IDs.
const button = document.querySelector("#runBtn");
const input  = document.querySelector("#referenceInput");


// Listen for when the user clicks "Run".
// Everything inside here runs at the moment of that click.
button.addEventListener("click", () => {

    // # STEP 1: Read the input 
    // The user typed something like "FACE" — a single string.
    // split("") breaks it into individual letters: ["F","A","C","E"]
    // That array is what our simulation engine expects.
    let letter = input.value.split("");

    // # STEP 2: Run the simulation 
    // Hand the letters off to fifoVm.js and get the results back.
    // result.sequence → the 16 shuffled letters (for the header row)
    // result.history  → 16 snapshots of memory state (for the frame rows)
    let result = runSimulation(letter);

    //# STEP 3: Build the header row 
    // Each letter in the sequence becomes a <th> (table header cell).
    // .map() transforms every letter into an HTML tag.
    // .join("") stitches them all into one continuous string.
    // We also prepend a "Memory Page" label cell on the left.
    let cells = `<th>Memory Page</th>` +
                result.sequence.map(p => `<th>${p}</th>`).join("");


    // ── STEP 4: Build the 3 Frame Rows ───────────────────
    // Each frame row shows what was in that memory slot at each of the 16 steps.
    // For every step, a cell shows one of three things:
    //   *        → this frame had a Hit at this step
    //   (letter) → this frame just received a new page at this step
    //   (empty)  → nothing happened in this frame at this step

    // Helper logic explanation:
    // - step.type === "hit" && step.hitIndex === X → asterisk in THIS row
    // - step.type === "hit" (any other row)        → empty, hit belongs elsewhere
    // - step.frames[X] changed compared to previous step → show the new letter
    // - step.frames[X] same as before              → empty, nothing changed
    // - step.frames[X] doesn't exist yet           → empty, slot not filled yet

    let frame1Row = `<tr><td>1.</td>${result.history.map((step, index) => {
        if (step.type === "hit" && step.hitIndex === 0) {
            return `<td>*</td>`;
        } else if (step.type === "hit") {
            return `<td></td>`;
        } else if (step.frames[0] !== undefined) {
            let prev = result.history[index - 1];
            if (!prev || prev.frames[0] !== step.frames[0]) {
                return `<td>${step.frames[0]}</td>`;
            }
            return `<td></td>`;
        } else {
            return `<td></td>`;
        }
    }).join("")}</tr>`;

    let frame2Row = `<tr><td>2.</td>${result.history.map((step, index) => {
        if (step.type === "hit" && step.hitIndex === 1) {
            return `<td>*</td>`;
        } else if (step.type === "hit") {
            return `<td></td>`;
        } else if (step.frames[1] !== undefined) {
            let prev = result.history[index - 1];
            if (!prev || prev.frames[1] !== step.frames[1]) {
                return `<td>${step.frames[1]}</td>`;
            }
            return `<td></td>`;
        } else {
            return `<td></td>`;
        }
    }).join("")}</tr>`;

    let frame3Row = `<tr><td>3.</td>${result.history.map((step, index) => {
        if (step.type === "hit" && step.hitIndex === 2) {
            return `<td>*</td>`;
        } else if (step.type === "hit") {
            return `<td></td>`;
        } else if (step.frames[2] !== undefined) {
            let prev = result.history[index - 1];
            if (!prev || prev.frames[2] !== step.frames[2]) {
                return `<td>${step.frames[2]}</td>`;
            }
            return `<td></td>`;
        } else {
            return `<td></td>`;
        }
    }).join("")}</tr>`;


    // ── STEP 5: Render the complete table ─────────────────
    // Stitch all rows together and inject into the #output div.
    // innerHTML stamps the HTML string directly onto the page.
    document.querySelector("#output").innerHTML = `
        <table border="1">
            <tr>${cells}</tr>
            ${frame1Row}
            ${frame2Row}
            ${frame3Row}
        </table>
    `;
});