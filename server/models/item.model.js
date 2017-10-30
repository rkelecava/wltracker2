const restful = require('node-restful'),
    mongoose = restful.mongoose;

const schema = new mongoose.Schema({
    description: String,
    unitOfMeasure: String,
    calories: Number
});

module.exports = restful.model('Item', schema);