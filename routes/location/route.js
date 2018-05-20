var mongoClient = require('../../db/mongo-client');
var dbConnection = require('../../db/db-connection');
var locationCrude = require('../../app/location-crud/crud');
var config = require('../../config.json')

var MongoClientInstance = mongoClient.getMongoClient();
var connectionUrl = dbConnection.getConnectionUrl();

module.exports = {
    getRouter: function(router, token, setAcceptsHeader) {
        router.route('/country')
        .get(setAcceptsHeader, (req, res) => {
            MongoClientInstance.connect(connectionUrl, (err, client) => {
                var dbName = client.db(config.dbName)
                locationCrude.getCountry(req, dbName, (result) => {
                    if(Object.keys(result).length > 0){
                        res.json(result);
                    }
                    else{
                        res.json('No records found')
                    }
                })
            })
        });
        router.route('/state/:countryId')
        .get(setAcceptsHeader, (req, res) => {
            MongoClientInstance.connect(connectionUrl, (err, client) => {
                if(!err){
                    var dbName = client.db(config.dbName);
                    locationCrude.getStateByCountryId(req, dbName, (result) => {
                        if(Object.keys(result).length > 0){
                            res.json(result);
                        }
                        else{
                            res.json('No records found')
                        }
                    });
                }
                else{
                    res.json(err)
                }
            })
        });
        router.route('/district/:stateId')
        .get(setAcceptsHeader, (req, res) => {
            MongoClientInstance.connect(connectionUrl, (err, client) => {
                if(!err){
                    var dbName = client.db(config.dbName);
                    locationCrude.getDistrictByStateId(req, dbName, (result) => {
                        if(Object.keys(result).length > 0){
                            res.json(result);
                        }
                        else{
                            res.json('No records found')
                        }
                    });
                }
                else{
                    res.json(err)
                }
            })
        });
    }
}