const express = require('express'),
    router = express.Router(),
    Item = require('../models/item.model');

Item.methods(['get', 'post', 'put', 'delete']);

Item.register(router, '/item');

module.exports = router;