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
    var tmp = [];
    users.forEach(x => tmp.push(x))
    return tmp
}

var database = {
    insert: insert,
    selectAll: selectAll
}

module.exports.database = database