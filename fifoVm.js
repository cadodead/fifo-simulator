// fifoVm.js — FIFO Virtual Memory Simulator (Core Logic)
// Built from scratch, March 21 – April 6, 2026


function runSimulation(inputArray) {

    /* PHASE 1: DATA PREPARATION
       Input: 4-letter word split into array (e.g. ["F","A","C","E"])
       Goal: Shuffle it 4 times to generate a 16-item reference sequence.
    */
    let referenceString = inputArray;
    let frames = [];
    let frameLimit = 3;
    let referenceSequence = [];
    let history = [];

    /* WHY insertionOrder?
       The original code used shift() + push() which moves pages around
       inside the frames array on eviction. This broke position-specific
       rendering — Frame 1 should always stay Frame 1 visually.

       insertionOrder is a separate queue that tracks WHICH FRAME SLOT
       was filled first. When eviction is needed, we look at insertionOrder
       to find the oldest slot index, replace that exact slot in frames,
       then move that slot index to the back of the queue.

       This way frames[0] always stays in row 1, frames[1] in row 2, etc.
       Physical positions never shift — only the contents change.
    */
    let insertionOrder = [];

    for (let i = 0; i < 4; i++) {
        // Spread copies the array before sorting so the original isn't mutated.
        // 0.5 - Math.random() randomly returns + or -, which shuffles sort order.
        let shuffle = [...referenceString].sort(() => 0.5 - Math.random());
        referenceSequence.push(...shuffle);
    }

    /* PHASE 2: THE FIFO ENGINE
       For each page in the sequence, detect Hit or Fault.
       Each branch records its own snapshot so history knows what type it was.
       AHA: history.push lives inside each branch — that's how it knows hit vs fault.
    */
    referenceSequence.forEach(page => {

        if (frames.includes(page)) {
            // HIT: Page already in memory — nothing changes in frames.
            // indexOf tells us which row gets the asterisk in the table.
            history.push({
                frames: [...frames],
                type: "hit",
                hitIndex: frames.indexOf(page)
            });

        } else if (frames.length < frameLimit) {
            // FAULT (Loading): Frames still have room.
            // slot = the index this page will occupy in frames.
            // We record it in insertionOrder so we know eviction order later.
            let slot = frames.length;
            frames.push(page);
            insertionOrder.push(slot);
            history.push({
                frames: [...frames],
                type: "fault",
                hitIndex: null
            });

        } else {
            // FAULT (Eviction): Frames full — FIFO eviction happens here.
            //
            // WHY insertionOrder.shift()?
            // insertionOrder holds slot indices in the order they were filled.
            // shift() removes and returns the FIRST (oldest) slot index.
            // We then replace exactly that position in frames with the new page.
            // Finally we push that slot index to the back of insertionOrder
            // since it now holds the most recently loaded page.
            //
            // Example:
            //   frames = ["B","E","R"], insertionOrder = [0,1,2]
            //   New page "A" arrives → evictSlot = 0 (B's slot)
            //   frames[0] = "A" → frames = ["A","E","R"]
            //   insertionOrder = [1,2,0]
            let evictSlot = insertionOrder.shift();
            frames[evictSlot] = page;
            insertionOrder.push(evictSlot);
            history.push({
                frames: [...frames],
                type: "fault",
                hitIndex: null
            });
        }
    });

    // ui.js needs both the sequence (header row) and history (frame rows).
    return {
        history: history,
        sequence: referenceSequence
    };
}