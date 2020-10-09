//dependencies
const fs = require('fs');
const path = require('path');

// a function to make sure the note has values for all properties

function validateNote(note) {
    // if any values are missing returns false
    if (!note.title || typeof note.title !== 'string') return false;
    if (!note.text || typeof note.text !== 'string') return false;
    if (!note.id || typeof note.id !== 'string') return false;

    // otherwise return true
    return true;
}

// a function that takes new note data, and the existing array.
function createNote(noteData, notesArray) {
    //assigns the note data to the note variable.
    const note = noteData;

    //pushes that to the existing array
    notesArray.push(note);
    //writes over the database file.
    fs.writeFileSync(
        path.join(__dirname, "../db/db.json"),
        JSON.stringify(notesArray, null, 2)
    );

    //returns the note variable for the response.
    return note;
}

// a function that takes an id, and an existing array
function deleteNotes(id, notesArray) {
    // creates a new array without the object that has a property that is the same as id.
    const newNotes = notesArray.filter(note => note.id !== id);

    // overwrites the database file.
    fs.writeFileSync(
        path.join(__dirname, "../db/db.json"),
        JSON.stringify(newNotes, null, 2)
    );
}

//exports
module.exports = {
    validateNote,
    createNote,
    deleteNotes
}