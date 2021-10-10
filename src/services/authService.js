// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

const tokenService = require('../services/tokenService.js');

// const register = (username, password, repeatPassword) => {
//     console.log(username, password, repeatPassword);
//     return bcrypt.hash(password, 9)
//         .then(hash => User.create({ username, password: hash }))
// };

const register = (username, password, repeatPassword) => {

    return User.create({ username, password })
};

const login = (username, password) => {
    return User.findByUsername(username)
        .then(user => Promise.all([user.validatePassword(password), user]))
        .then(([isValid, user]) => {
            // console.log(isValid);
            // console.log(user);
            if (isValid) {
                return user
            } else {
                throw { message: 'Username or password is invalid' }
            }
        })
        .catch(() => null)
};




const authService = {
    register,
    login
};

module.exports = authService;


// exports.register = function(username, password, repeatPassword){
//     console.log(username, password, repeatPassword);
// };