function load(app) {
    app.use('/api/v1', require('./main.routes'));
    app.use('/api/v1', require('./item.routes'));
    app.use('/api/v1', require('./entry.routes'));
    app.use('/api/v1', require('./weighin.routes'));
}

module.exports = { load };