const notes = require('../../db/db.json');
const router = require('express').Router();

router.get('/notes', (req, res) => {
    let results = notes;
    res.json(results);
});

router.post('/notes', (req, res) => {
    console.log(req.body);

    res.send(JSON.stringify(req.body));
});



module.exports = router;