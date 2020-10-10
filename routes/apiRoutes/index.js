//dependencies
const router = require('express').Router();

const { validateNote, createNote, deleteNote, readNotes } = require('../../lib/notes.js');

//get handler for the notes api
router.get('/notes', (req, res) => {
    //gets the data from the notes array
    const { notes } = readNotes();
    //and sends it to the user.
    res.send(notes);
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
        const { notes:current } = readNotes();
        const note = createNote(req.body, current);
        //and send it back as a response.
        res.send(note);
    }
});

//delete handler for the notes api that uses the id as the paramater
router.delete('/notes/:id', (req, res) => {
    const { notes:current } = readNotes();
    deleteNote(req.params.id, current)
        .then((data) => {
            res.send(data)
        })
        .catch(_err_ => res.status(500).json(err));
});

//exports
module.exports = router;