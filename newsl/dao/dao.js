const databaseModule = require('./database');
const utilsModule = require('../utils/utils');

var addUser = function (user) {
    var res = false;
    var newUser = {
        name: user.name,
        surname: user.surname,
        email: user.email,
        birthDate: user.birthDate,
        cap: user.cap
    }
    res = databaseModule.database.insert(newUser);
    return res;
}

var readAll = function () {
    return databaseModule.database.selectAll();
}

var getByEmail = function (email) {
    var res = undefined;
    var allUsers = databaseModule.database.selectAll();
    if (!utilsModule.utils.isNull(allUsers)) {
        res = allUsers.find(x => x.email === email);
    }
    return res;
}

var newsldao = {
    addUser: addUser,
    readAll: readAll,
    getByEmail: getByEmail
}

module.exports.dao = newsldao;