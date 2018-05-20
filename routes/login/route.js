
var mongoClient = require('../../db/mongo-client');
var dbConnection = require('../../db/db-connection');
var loginCrude = require('../../app/login-crud/crud');

var MongoClientInstance = mongoClient.getMongoClient();
var connectionUrl = dbConnection.getConnectionUrl();

module.exports = {
    getRouter: function(router, token, setAcceptsHeader) {
        router.route('/login')
        .post(setAcceptsHeader, (req, res) => {
            MongoClientInstance.connect(connectionUrl, (err, client) => {
                var dbName = client.db('nrf')
                loginCrude.authenticateUser(req,dbName,(result) => {
                    if(Object.keys(result).length > 0){
                        if(result[0].password !== req.body.password){
                            res.json({ success: false, message: 'Authentication failed. Wrong password.' })
                        }
                        else {
                            const payload = {
                                user: {
                                    name: result[0].name,
                                    role: result[0].role
                                }
                            }
                            token.payload = payload;
                            res.json({
                                success: true,
                                message: 'Enjoy your token!',
                                token: token,
                                payload: payload
                            })
                        }
                    }
                    else {
                        res.json('No reocrds found for this id');
                    }
                    //dbName.close();
                });
            })
        });
    }
}