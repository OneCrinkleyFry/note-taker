//dependencies
const path = require('path');
const router = require('express').Router();

// routes to display the static pages.
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/notes.html'));
});

router.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});

//exports
module.exports = router;