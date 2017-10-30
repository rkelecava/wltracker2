const express = require('express'),
    app = express(),
    path = require('path'),
    http = require('http'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    Routes = require('./routes'),
    Models = require('./models'),
    Db = require('./db.js'),
    port = process.env.port || '8121';

Models.load();

Db.connect();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '../client')));

Routes.load(app);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.set('port', port);

http.createServer(app).listen(port, () => {
    console.log(`UPS Shipping rate APP running on localhost:${ port }`);
});