module.exports = {
    getMongoClient: function () {
        var mongoClient = require('mongodb').MongoClient
            , assert = require('assert');
        return mongoClient;
    }
};