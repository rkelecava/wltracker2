const mongoose = require('mongoose'),
    host = 'localhost',
    db = 'wltracker2';

function connect() {
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://' + host + '/' + db, { useMongoClient: true }, (err) => {
        if (err) { 
            console.log(err);
            process.exit();
        }

        console.log('connected to ' + db + ' on ' + host);
    });
}

module.exports = { connect };