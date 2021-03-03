"use strict";
var jwt = require('jsonwebtoken');
// const pconfig = require('config');
var secret = 'loveyoubabes';
module.exports = function (req, res, next) {
    //get token from header
    var token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    // jwt.verify(token, secret, function (err: any, decoded: any) {
    // 	if (err) {
    // 		return res.status(401).json({ msg: 'Token is invalid' });
    // 	} else {
    // 		req.user = decoded.user;
    // 		next();
    // 	}
    // });
    try {
        var decoded = jwt.verify(token, secret);
        res.locals.user = decoded.user;
        res.locals.name;
        return next();
    }
    catch (err) {
        res.status(401).json({ msg: 'Token not valid' });
    }
};
