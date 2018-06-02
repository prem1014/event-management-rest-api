var mongoClient = require('../../db/mongo-client');
var dbConnection = require('../../db/db-connection');
var searchDetailCrud = require('../../app/search/crud');

var MongoClientInstance = mongoClient.getMongoClient();
var connectionUrl = dbConnection.getConnectionUrl();

module.exports = {
    getRouter: function(router, token) {
        function setAcceptsHeader(req, res, next) {
            'use strict';
            res.setHeader('Access-Control-Allow-Origin', '*');
            next();
        }
        router.route('/search')
        .post(setAcceptsHeader, (req, res) => {
            MongoClientInstance.connect(connectionUrl, (err, client) => {
                var dbName = client.db('event-management')
                searchDetailCrud.searchServicesDetail(req, dbName, (err, result) => {
                    if(result.success){
                        res.json({success: true,message: 'Data Found!', data: result.data});
                    }
                    else{
                        res.json({success: true,message: 'Something went wrong'});
                    }     
                })
            })     
        })
    }    
}    
