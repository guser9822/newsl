const users = new Set();

var insert = function (user) {
    res = false;
    if (!users.has(user)) {
        users.add(user);
        res = true;
    }
    return res;
}

var selectAll = function () {
    return users.keys;
}

var database = {
    insert: insert,
    selectAll: selectAll
}

module.exports.database = database