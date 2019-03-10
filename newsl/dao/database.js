const users = [];

var insert = function (user) {

    res = users.find(x => x.name === user.name &&
        x.surname === user.surname &&
        x.email === user.email &&
        x.cap === user.cap &&
        x.birthDate === user.birthDate
    )

    if (!res) {
        users.push(user)
    }

    return !res;
}

var selectAll = function () {
    return users.keys;
}

var database = {
    insert: insert,
    selectAll: selectAll
}

module.exports.database = database