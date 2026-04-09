// ============================================================
// fifoVm.js — The Brain of the FIFO Simulator
// This file contains all the memory simulation logic.
// It does NOT touch the screen — that's ui.js's job.
// Built from scratch: March 21 – April 6, 2026
// ============================================================


function runSimulation(inputArray) {

    // ─────────────────────────────────────────────
    // PHASE 1: PREPARING THE REFERENCE SEQUENCE
    // ─────────────────────────────────────────────
    // The user types a 4-letter word like "FACE".
    // We shuffle those 4 letters 4 times to create
    // a 16-letter sequence — this simulates a stream
    // of memory page requests, just like in class.

    let referenceString = inputArray;   // The 4 letters from the user's input
    let frames = [];                    // The memory slots (starts empty, holds max 3)
    let frameLimit = 3;                 // Our teacher uses 3 frames
    let referenceSequence = [];         // Will hold all 16 letters after shuffling
    let history = [];                   // Records what happened at every single step

    // insertionOrder keeps track of WHICH SLOT was filled first.
    // We need this for eviction — FIFO always removes the page
    // that entered memory the earliest.
    // Without this, evicted pages would shift positions visually,
    // which breaks the table layout our teacher expects.
    let insertionOrder = [];

    // Shuffle the 4 letters 4 times and collect everything
    // into one long 16-letter sequence.
    for (let i = 0; i < 4; i++) {
        // [...referenceString] makes a copy so we don't scramble the original.
        // The sort trick with Math.random() randomizes the order each time.
        let shuffle = [...referenceString].sort(() => 0.5 - Math.random());
        referenceSequence.push(...shuffle); // ...shuffle unpacks 4 letters individually
    }


    // ─────────────────────────────────────────────
    // PHASE 2: THE FIFO ENGINE
    // ─────────────────────────────────────────────
    // We go through each of the 16 letters one by one.
    // For each letter, exactly one of three things happens:
    //   1. Page Hit            — letter is already in memory, mark with *
    //   2. Page Fault (Loading)   — empty slot available, fill it
    //   3. Page Fault (Eviction)  — memory full, oldest page gets replaced

    referenceSequence.forEach(page => {

        if (frames.includes(page)) {
            // ── HIT ──────────────────────────────────────────
            // This letter is already in one of our frames.
            // Nothing changes in memory — we just note it as a hit (*).
            // indexOf() tells us which frame slot it's in so the asterisk
            // appears in the correct row on the table.
            history.push({
                frames: [...frames],            // Snapshot of memory right now
                type: "hit",
                hitIndex: frames.indexOf(page)  // Which row gets the * in the table
            });

        } else if (frames.length < frameLimit) {
            // ── FAULT: LOADING ───────────────────────────────
            // Memory isn't full yet — this is the "staircase" phase.
            // We add the new letter to the next available slot
            // and record which slot it went into for future evictions.
            let slot = frames.length;   // Next empty slot (0, then 1, then 2)
            frames.push(page);
            insertionOrder.push(slot);
            history.push({
                frames: [...frames],
                type: "fault",
                hitIndex: null
            });

        } else {
            // ── FAULT: EVICTION ──────────────────────────────
            // Memory is full. Kick out the oldest page — that's FIFO.
            //
            // insertionOrder tells us the order slots were filled.
            // shift() grabs the slot that was filled FIRST (the oldest).
            // We overwrite that exact slot with the new page,
            // then move that slot index to the back of the queue
            // since it now holds the newest page.
            //
            // Example:
            //   frames = ["B","E","R"],  insertionOrder = [0,1,2]
            //   New page "A" arrives → evict slot 0 (holds "B")
            //   frames[0] = "A"  →  frames = ["A","E","R"]
            //   insertionOrder becomes [1,2,0]
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

    // Send both pieces of data back to ui.js:
    // sequence → builds the header row (16 letters across the top)
    // history  → builds the 3 frame rows below
    return {
        history: history,
        sequence: referenceSequence
    };
}