// app/models/marina.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var MarinaSchema   = new Schema({
    name: String
});

module.exports = mongoose.model('Marina', BearSchema);