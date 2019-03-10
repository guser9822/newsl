const serverModule = require('../server/server');
const https = require('https');

serverModule.newslserver.start('test');

//Test Hello api
var testHelloApi = function () {
    var options = {
        hostname: 'localhost',
        port: 8080,
        path: '/hello',
        method: 'GET',
        rejectUnauthorized: false,
        headers: {
            'Content-Type': 'application/json',
        }
    };

    var req = https.request(options, (res) => {
        console.log('START HELLO API TEST');
        console.log(' ');
        console.log('statusCode:', res.statusCode);
        console.log(' ');
        console.log('headers:', res.headers);
        res.on('data', (d) => {
            process.stdout.write(d);
        });
        res.on('end', () => {
            console.log(' ');
            console.log('END HELLO API TEST');
            console.log('-------------------------------------------------------');
        })
    });

    req.on('error', (e) => {
        console.error(e);
    });

    req.end(); 
}

testHelloApi();

var getAllUsers = function () {

    var options = {
        hostname: 'localhost',
        port: 8080,
        path: '/newsletter/users',
        method: 'GET',
        rejectUnauthorized: false,
        headers: {
            'Content-Type': 'application/json',
        }
    };

    var req = https.request(options, (res) => {
        console.log('START GET ALL USERS API TEST');
        console.log(' ');
        console.log('statusCode:', res.statusCode);
        console.log(' ');
        console.log('headers:', res.headers);
        console.log(' ');

        res.on('data', (d) => {
            process.stdout.write(d);
        });

        res.on('end', () => {
            console.log(' ');
            console.log('END GET ALL USERS API TEST');
            console.log('-------------------------------------------------------');
        })

    });

    req.on('error', (e) => {
        console.error(e);
    });

    req.write('ok');
    req.end();
}


getAllUsers();


//Test signup api
var signup = function (userInfo) {

    var postData = userInfo;

    var options = {
        hostname: 'localhost',
        port: 8080,
        path: '/newsletter/signup',
        method: 'POST',
        rejectUnauthorized: false,

        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData)
        }
    };

    var req = https.request(options, (res) => {
        console.log('START SIGNUP API TEST : Insert user');
        console.log(' ');
        console.log('statusCode:', res.statusCode);
        console.log(' ');
        console.log('headers:', res.headers);

        res.on('data', (d) => {
            process.stdout.write(d);
        });

        res.on('end', () => {
            console.log(' ');
            console.log('END SIGNUP API TEST');
            console.log('-------------------------------------------------------');
        })

    });

    req.on('error', (e) => {
        console.error(e);
    });

    req.write(postData);
    req.end();
}

signup(JSON.stringify({
    name: 'Mark',
    surname: 'Bing',
    email: 'binggame@hotmail.com',
    birthDate: '11/11/1982',
    cap: '11221'
}));

signup(JSON.stringify({
    name: 'Franco',
    surname: 'Svizzero',
    email: 'frank883.com',
    birthDate: '01/22/1990',
    cap: '44328'
}));

signup(JSON.stringify({
    name: 'Kim',
    surname: 'Red',
    email: 'kim@ko.com',
    birthDate: '01/22/1990',
    cap: '44328'
}));

getAllUsers();
