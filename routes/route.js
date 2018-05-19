var express = require('express');
var router = express.Router();
var loginRouter = require('./login/route');
module.exports = {
    getRoutes: function (token) {
        loginRouter.getRouter(router, token);
        return router;
    }
}