const restful = require('node-restful'),
    mongoose = restful.mongoose;

const schema = new mongoose.Schema({
    logged: { type: Date, default: Date.now },
    quantity: Number,
    item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' }
});

module.exports = restful.model('Entry', schema);