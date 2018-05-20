var mongoClient = require('../../db/mongo-client');
var dbConnection = require('../../db/db-connection');
var providerCrude = require('../../app/provider-crud/crud');

var MongoClientInstance = mongoClient.getMongoClient();
var connectionUrl = dbConnection.getConnectionUrl();

module.exports = {
    getRouter: function(router, token, setAcceptsHeader) {
        router.route('/provider')
        .post(setAcceptsHeader, (req, res) => {
            MongoClientInstance.connect(connectionUrl, (err, client) => {
                var dbName = client.db('event-management')
                providerCrude.saveServiceDetails(req, dbName, (err, result) => {
                    if(result.success){
                        res.json({success: true,message: 'Data Saved!'});
                    }
                    else{
                        res.json({success: true,message: 'Something went wrong'});
                    }     
                })
            })    
        })    
    }    
}    