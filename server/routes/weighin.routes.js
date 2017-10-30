const express = require('express'),
    router = express.Router(),
    Weighin = require('../models/weighin.model');

Weighin.methods(['get', 'put', 'post', 'delete']);

Weighin.register(router, '/weighin');

module.exports = router;