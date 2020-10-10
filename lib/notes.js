//dependencies
const fs = require('fs');
const { resolve } = require('path');
const path = require('path');

function readNotes() {
    return JSON.parse(fs.readFileSync(path.join(__dirname, "../db/db.json"), "utf8"));
}

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

    notesArray.push(noteData);
    const noteObject = {
        notes: notesArray
    }

    //writes over the database file.
    fs.writeFileSync(
        path.join(__dirname, "../db/db.json"),
        JSON.stringify(noteObject, null, 2)
    );

    //returns the note variable for the response.
    return noteObject;
}

// a function that takes an id, and an existing array
const deleteNote = (id, notesArray) => new Promise((res, err) => {

    // creates a new array without the object that has a property that is the same as id.
    const notesObject = {};
    const newNotes =
        // new Promise(() => {
        notesObject.notes = notesArray.filter(note => note.id !== id);



    // return notesObject.notes;
    // });

    // overwrites the database file.
    fs.writeFileSync(
        path.join(__dirname, "../db/db.json"),
        JSON.stringify(notesObject, null, 2)
    );

    res(newNotes)
    // return newNotes;
})

//exports
module.exports = {
    readNotes,
    validateNote,
    createNote,
    deleteNote
}