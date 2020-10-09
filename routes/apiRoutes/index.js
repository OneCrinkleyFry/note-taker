//dependencies
const notes = require('../../db/db.json');
const router = require('express').Router();

const { validateNote, createNote, deleteNotes } = require('../../lib/notes.js');

//get handler for the notes api
router.get('/notes', (req, res) => {
    //gets the data from the notes array
    let results = notes;
    //and sends it to the user.
    res.json(results);
});

//post handler for the notes api
router.post('/notes', (req, res) => {
    //assigns a unique id, that will never be the same again.
    //it is the miliseconds from Jan 1 1970
    req.body.id = Date.now().toString();

    // if this function returns false
    if (!validateNote(req.body)) {
        //send this error
        res.status(400).send('This is not properly formatted.');
        //otherwise
    } else {
        //create a note
        const note = createNote(req.body, notes);
        //and send it back as a response.
        res.send(note);
    }
});

//delete hadler for the notes api that uses the id as the paramater
router.delete('/notes/:id', (req, res) => {
    deleteNotes(req.params.id, notes);
    res.send(`DELETE request to ${req.params.id}`);
});

//exports
module.exports = router;