var newslValidator = require('newsl-validator');
var utilsModule = require('../utils/utils');
var daoModule = require('../dao/dao');

var allRegisteredUsers = function () {

    var res = {
        result: 'ko',
        message: 'No users currently registered to the newsletter.',
        payload : []
    }

    var daoRes = daoModule.dao.readAll();
    if (!utilsModule.utils.isNull(res)) {
        res.payload = daoRes;
        res.message = 'All users retrieved'
        res.result = 'ok';
    }
}

var signup = function (params) {

    var res = {
        result : 'ko',
        message : 'Error during the registration. One or more field are empty.'
    }

    if (!utilsModule.utils.isNull(params)) {

        var name = params.name;
        var surname = params.surname;
        var email = params.email;
        var birthDate = params.birthDate;
        var cap = params.cap;

        if (!utilsModule.utils.isNull(name) &&
            !utilsModule.utils.isNull(surname) &&
            !utilsModule.utils.isNull(email) &&
            !utilsModule.utils.isNull(birthDate) &&
            !utilsModule.utils.isNull(cap)) {

            var nameValidation = newslValidator.validator({
                content: name,
                type: 'NAME'
            });

            var surnameValidation = newslValidator.validator({
                content: surname,
                type: 'SURNAME'
            });

            var birthDateValidation = newslValidator.validator({
                content: birthDate,
                type: 'BIRTH_DATE'
            });

            var emailValidation = newslValidator.validator({
                content: email,
                type: 'EMAIL'
            });

            var capValidation = newslValidator.validator({
                content: cap,
                type: 'CAP',
                criteria: function (fieldToValidate) {
                    return /^[0-9]{5}$/.test(fieldToValidate)
                }
            });

            if (nameValidation &&
                surnameValidation &&
                birthDateValidation &&
                emailValidation &&
                capValidation) {

                res.result = 'ok';
                var daoRes = daoModule.dao.addUser(params);
                if (daoRes) {
                    res.message = 'User ' + name + ' ' + surname + ' successfully registered to the newsletter.';
                } else res.message = 'User ' + name + ' ' + surname + ' already registered to the newsletter.';


            }
            else {
                res.message = 'Error during the registration. ';
                if (!nameValidation)
                    res.message += 'Invalid name ' + name +
                        '. It must be made of characters, white space and this symbols  @#?|! are not allowed. ';

                if (!surnameValidation)
                    res.message += 'Invalid surname ' + surname +
                        '. It must be made of characters, white space and this symbols  @#?|! are not allowed. ';

                if (!emailValidation)
                    res.message += 'Invalid email address ' + email +
                        '. It must follow the generic form email@example.domain. ';

                if (!birthDateValidation)
                    res.message += 'Invalid birth date ' + birthDate +
                        '. It must follow the generic form GG/MM/AAAA. ';

                if (!capValidation)
                    res.message += 'Invalid cap number ' + cap +
                        '. It must be made of five numbers only ';
            }
        }
    }
    return res;
}

var newslbl = {
    signup: signup,
    allRegisteredUsers: allRegisteredUsers
}

module.exports.newslbl = newslbl;