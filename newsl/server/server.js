const https = require('https');
const fs = require('fs');
const restcontrollerModule = require('../rest/restcontroller');

var startServer = function (env) {

    var certsPath = env === 'test' ? '../resources/' : './resources/';//in the secon case root is app.js level
    var keyName = 'server.key';
    var certName = 'server.cert';

    var httpsOptions = {
        key: fs.readFileSync(certsPath + keyName),
        cert: fs.readFileSync(certsPath + certName)
    };

    https.createServer(httpsOptions, restcontrollerModule.restcontroller.requestHandler).
        listen(8080);
}

var newslserver = {
    start: startServer 
}

module.exports.newslserver = newslserver;