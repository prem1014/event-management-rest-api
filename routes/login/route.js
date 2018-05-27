
var mongoClient = require('../../db/mongo-client');
var dbConnection = require('../../db/db-connection');
var loginCrude = require('../../app/login-crud/crud');
var config = require('../../config.json')

var MongoClientInstance = mongoClient.getMongoClient();
var connectionUrl = dbConnection.getConnectionUrl();

module.exports = {
    getRouter: function (router, token, setAcceptsHeader) {
        router.route('/login')
            .post(setAcceptsHeader, (req, res) => {
                MongoClientInstance.connect(connectionUrl, (err, client) => {
                    var dbName = client.db(config.dbName)
                    if (!req.body.isAuthReq) {
                        loginCrude.saveNewUserDetails(req, dbName, (result) => {
                            if (Object.keys(result).length > 0) {
                                res.json({
                                    success: true,
                                    message: 'Registration completed. You can login now',
                                    payload: result
                                })
                            }
                            else{
                                res.json({
                                    success: false,
                                    message: 'Failed!! Please try again',
                                    payload: result
                                })
                            }
                        });
                    }
                    else {
                        loginCrude.authenticateUser(req, dbName, (result) => {
                            if (Object.keys(result).length > 0) {
                                if (result[0].password !== req.body.password) {
                                    res.json({ success: false, message: 'Authentication failed. Wrong password.' })
                                }
                                else {
                                    console.log(result);
                                    console.log(result[0]);
                                    const payload = {
                                        
                                        user: {
                                            name: result[0].name,
                                            role: result[0].role,
                                            email: result[0]._id
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
                                res.json({ message: 'No reocrds found for this id' });
                            }
                            //dbName.close();
                        });
                    }
                })
            });
    }
}