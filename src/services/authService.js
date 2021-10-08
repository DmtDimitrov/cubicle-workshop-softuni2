const bcrypt = require('bcrypt');
const User = require("../models/User.js");

const register = (username, password, repeatPassword) => {
    console.log(username, password, repeatPassword);
    return bcrypt.hash(password, 9)
        .then(hash => User.create({ username, password: hash }))
};

const authService = {
    register,
};

module.exports = authService;


// exports.register = function(username, password, repeatPassword){
//     console.log(username, password, repeatPassword);
// };