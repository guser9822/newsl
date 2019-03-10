const serverModule = require('../server/server');
const https = require('https');

serverModule.newslserver.start('test');

//Test for hello api
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

//Test for get all users api
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

//Test for signup api
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

signup(JSON.stringify({
    name: 'Gennar0',
    surname: 'De Martino',
    email: 'gen.tr5@live.com',
    birthDate: '142/02/1957',
    cap: '44328'
}));

signup(JSON.stringify({
    name: 'Marta',
    surname: 'Spanne',
    email: 'sva@gmail.it',
    birthDate: '01/12/1998',
    cap: '443'
}));

getAllUsers();

//Test for filter by email
var getUserByEmail = function (email) {

    var postData = email;
    var options = {
        hostname: 'localhost',
        port: 8080,
        path: '/newsletter/getbyemail',
        method: 'POST',
        rejectUnauthorized: false,

        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData)
        }
    };

    var req = https.request(options, (res) => {
        console.log('START GET BY EMAIl API TEST : Find user');
        console.log(' ');
        console.log('statusCode:', res.statusCode);
        console.log(' ');
        console.log('headers:', res.headers);

        res.on('data', (d) => {
            process.stdout.write(d);
        });

        res.on('end', () => {
            console.log(' ');
            console.log('END  GET BY EMAIl API TEST');
            console.log('-------------------------------------------------------');
        })

    });

    req.on('error', (e) => {
        console.error(e);
    });

    req.write(postData);
    req.end();
}

getUserByEmail(JSON.stringify({ email: 'test92@nln.it' }));
getUserByEmail(JSON.stringify({ email: 'binggame@hotmail.com' }));
getUserByEmail(JSON.stringify({ email: 'rt1.com' }));