var utilsModule = require('../utils/utils');
var urlModule = require('url');

var requestHandler = function (req, res) {

    var url = req.url;
    var queryString = urlModule.parse(url, true);
    var pathName = queryString.pathname;
    if (!utilsModule.utils.isNull(pathName) && pathName!=='/') {

        if (pathName === '/hello') {
            res.writeHead(200, {'Content-Type': 'application/json' });
            var helloMessage = 'Heeeee Hellooooooooo';
            var json = JSON.stringify({ message: helloMessage});
            res.end(json);
        } else {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end();
        }

    } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('Home Page');
        res.end();
    }
}


var restcontroller = {
    requestHandler: requestHandler
}

module.exports.restcontroller = restcontroller;