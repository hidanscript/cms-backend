module.exports = () => {
    var db = require('../libs/db-connection');
    var Schema = require('mongoose').Schema;

    var post = Schema({
        title: String,
        content: String,
    });

    return db.model('posts', post);
};