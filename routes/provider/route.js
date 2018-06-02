var mongoClient = require('../../db/mongo-client');
var dbConnection = require('../../db/db-connection');
var providerCrude = require('../../app/provider-crud/crud');

var MongoClientInstance = mongoClient.getMongoClient();
var connectionUrl = dbConnection.getConnectionUrl();
var config = require('../../config.json')

module.exports = {
    getRouter: function (router, token, setAcceptsHeader) {
        router.route('/provider')
            .post(setAcceptsHeader, (req, res) => {
                MongoClientInstance.connect(connectionUrl, (err, client) => {
                    var dbName = client.db(config.dbName)
                    providerCrude.saveServiceDetails(req, dbName, (err, result) => {
                        if (result.success) {
                            res.json({ success: true, message: 'Data Saved!' });
                        }
                        else {
                            res.json({ success: false, message: 'Something went wrong' });
                        }
                    })
                })
            });
        router.route('/provider/:createdBy')
            .get(setAcceptsHeader, (req, res) => {
                MongoClientInstance.connect(connectionUrl, (err, client) => {
                    var dbName = client.db(config.dbName)
                    providerCrude.getAllServices(req, dbName, (result) => {
                        if (result.success) {
                            res.json(result);
                        }
                        else {
                            res.json({ success: false, message: 'Something went wrong' })
                        }
                    })
                });
            });
        router.route('/provider/:serviceId')
            .get(setAcceptsHeader, (req, res) => {
                MongoClientInstance.connect(connectionUrl, (err, client) => {
                    var dbName = client.db('event-management')
                    providerCrude.getServiceById(req, dbName, (result) => {
                        if (result.success) {
                            res.json(result);
                        }
                        else {
                            res.json({ success: false, message: 'Something went wrong' })
                        }
                    })
                });
            })    
    }
}    