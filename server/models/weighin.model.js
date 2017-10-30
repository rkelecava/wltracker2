const restful = require('node-restful'),
    mongoose = restful.mongoose;

const schema = new mongoose.Schema({
    entered: Date,
    weight: Number
});

module.exports = restful.model('Weighin', schema);