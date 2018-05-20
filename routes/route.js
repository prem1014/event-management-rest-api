var express = require('express');
var router = express.Router();
var loginRouter = require('./login/route');
var locationRouter = require('./location/route');
var providerRouter = require('./provider/route');
module.exports = {
    getRoutes: function (token, setAcceptsHeader) {
        loginRouter.getRouter(router, token, setAcceptsHeader);
        locationRouter.getRouter(router, token, setAcceptsHeader);
        providerRouter.getRouter(router, token, setAcceptsHeader);
        return router;
    }
}