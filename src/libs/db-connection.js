const mongoose = require('mongoose');

let db;

module.exports = function Connection() {
    if(!db) {
        db = mongoose.connect('mongodb://localhost:27017/test', 
                             { useUnifiedTopology: true , 
                               useNewUrlParser: true });
    }

    return db;
}