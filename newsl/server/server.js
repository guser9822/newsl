var https = require('https');
var fs = require('fs');
var restcontrollerModule = require('../rest/restcontroller');

var certsPath = './resources/';
var keyName = 'server.key';
var certName = 'server.cert';

var httpsOptions = {
    key: fs.readFileSync(certsPath + keyName),
    cert: fs.readFileSync(certsPath + certName)
};

var startServer = function () {
    https.createServer(httpsOptions, restcontrollerModule.restcontroller.requestHandler).
        listen(8080);
}

var newslserver = {
    start: startServer 
}

module.exports.newslserver = newslserver;