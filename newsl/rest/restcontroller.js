const utilsModule = require('../utils/utils');
const urlModule = require('url');
const newslBlModule = require('../businesslogic/newslbl');

var requestHandler = function (req, res) {

    var url = req.url;
    var queryString = urlModule.parse(url, true);
    var pathName = queryString.pathname;
    if (!utilsModule.utils.isNull(pathName) && pathName!=='/') {

        switch (pathName) {
            case '/hello':
                res.writeHead(200, { 'Content-Type': 'application/json' });
                var helloMessage = 'Heeey! Welcome on the newsletter application!';
                var json = JSON.stringify({ message: helloMessage });
                res.end(json);
            break;
            case '/newsletter/signup':
                res.writeHead(200, { 'Content-Type': 'application/json' });
                var blRes = newslBlModule.newslbl.signup(queryString.query);
                var json = JSON.stringify(blRes);
                res.end(json);
                break;
            case '/newsletter/users':
                res.writeHead(200, { 'Content-Type': 'application/json' });
                var blRes = newslBlModule.newslbl.allRegisteredUsers();
                var json = JSON.stringify(blRes);
                res.end(json);
                break;
            case '/newsletter/getbyemail':
                res.writeHead(200, { 'Content-Type': 'application/json' });
                var blRes = newslBlModule.newslbl.filterByEmail(queryString.query);
                var json = JSON.stringify(blRes);
                res.end(json);
                break;
            default:
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