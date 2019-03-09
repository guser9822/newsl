
var isNull = function (p) {
    return p === null || p === undefined || p === '' && 0 === p.length;
}

var utils = {
    isNull: isNull
}

module.exports.utils = utils;