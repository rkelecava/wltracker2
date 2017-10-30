const express = require('express'),
    router = express.Router(),
    Entry = require('../models/entry.model');

router.get('/entry', (req, res) => {
    Entry.find({}).populate('item').exec((err, entries) => {
        if (err) { return res.json([]); }
        res.json(entries);
    });
});

router.post('/entry', (req, res) => {
    var entry = new Entry(req.body);
    entry.save((err, item) => {
        if (err) { console.log(err); }
        res.json(item);
    });
});

Entry.methods(['delete']);
Entry.register(router, '/entry');

module.exports = router;