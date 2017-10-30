const express = require('express'),
    router = express.Router();

router.get('/', (req, res) => {
    res.send('Api is working');
});

module.exports = router;