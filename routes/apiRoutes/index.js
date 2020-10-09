const notes = require('../../db/db.json');
const router = require('express').Router();

const { validateNote, createNote } = require('../../lib/notes.js');


router.get('/notes', (req, res) => {
    let results = notes;
    res.json(results);
});

router.post('/notes', (req, res) => {
    req.body.id = Date.now().toString();

    if (!validateNote(req.body)) {
        res.status(400).send('This is not properly formatted.');
    } else {
        const note = createNote(req.body, notes);
        res.send(note);
    }
});



module.exports = router;