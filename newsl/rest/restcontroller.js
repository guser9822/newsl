const utilsModule = require('../utils/utils');
const urlModule = require('url');
const newslBlModule = require('../businesslogic/newslbl');

var requestHandler = function (req, res) {

    if (req.headers['content-type'] === 'application/json')
    {
        //Convert byte to string for post request
        if (req.method === 'POST' || req.method === 'PUT') {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                var objectBody = JSON.parse(body);
                executeRequest(req, res, objectBody);
            });
        } else if (req.method === 'GET'){
            executeRequest(req, res, {});
        }

    } else {
        res.writeHead(415, { 'Content-Type': 'application/json' });
        var json = JSON.stringify({ result : 'ko', message: 'Invalid content type: ' + req.headers['content-type'] });
        res.end(json);
    }
}

var executeRequest = function(req,res,bodyParams){

    var url = req.url;
    var queryString = urlModule.parse(url, true);
    var pathName = queryString.pathname;
    var httpRespCode = 200;
    if (!utilsModule.utils.isNull(pathName) && pathName !== '/') {

        switch (pathName) {
            case '/hello':
                res.writeHead(httpRespCode, { 'Content-Type': 'application/json' });
                var helloMessage = 'Heeey! Welcome on the newsletter application!';
                var json = JSON.stringify({ message: helloMessage });
                res.end(json);
                break;
            case '/newsletter/signup':
                var blRes = newslBlModule.newslbl.signup(bodyParams);
                if (blRes.result === 'ko')
                    httpRespCode = 422;
                res.writeHead(httpRespCode, { 'Content-Type': 'application/json' });
                var json = JSON.stringify(blRes);
                res.end(json);
                break;
            case '/newsletter/users':
                var blRes = newslBlModule.newslbl.allRegisteredUsers();
                if (blRes.result === 'ko')
                    httpRespCode = 404;
                res.writeHead(httpRespCode, { 'Content-Type': 'application/json' });
                var json = JSON.stringify(blRes);
                res.end(json);
                break;
            case '/newsletter/getbyemail':
                var blRes = newslBlModule.newslbl.filterByEmail(bodyParams);
                if (blRes.result === 'ko')
                    httpRespCode = 422;
                res.writeHead(httpRespCode, { 'Content-Type': 'application/json' });
                var json = JSON.stringify(blRes);
                res.end(json);
                break;
            default:
                res.writeHead(404, { 'Content-Type': 'application/json' });
                var json = JSON.stringify({ result: 'ko',  message: 'Service not found : '+pathName});
                res.end(json);
        }

    } else {
        res.writeHead(httpRespCode, { 'Content-Type': 'application/json' });
        var json = JSON.stringify({ message: 'home' });
        res.end(json);
    }

}

var restcontroller = {
    requestHandler: requestHandler
}

module.exports.restcontroller = restcontroller;