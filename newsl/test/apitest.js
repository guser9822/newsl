const serverModule = require('../server/server');
const https = require('https');

serverModule.newslserver.start('test');

//Add some users
var test = function () {
    

}



var postData = JSON.stringify({
    name: 'Mark',
    surname: 'Bing',
    email: 'binggame@hotmail.com',
    birthDate: '11/11/1982',
    cap: '11221'
})

var options = {
    hostname: 'localhost',
    port: 8080,
    path: '/newsletter/signup',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': postData.length
    }
};

var req = https.request(options, (res) => {
    console.log('statusCode:', res.statusCode);
    console.log('headers:', res.headers);

    res.on('data', (d) => {
        process.stdout.write(d);
    });
});

req.on('error', (e) => {
    console.error(e);
});

req.write(postData);
req.end();