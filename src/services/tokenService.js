// const jwt = require('jsonwebtoken');
const { SECRET } = require('../constants.js');
const jwtUtils = require('../utils/jwtUtils.js');

// function jwtSign(payload, secret) {
//     let promise = new Promise((resolve, reject) => {
//         jwt.sign(payload, secret, function (err, token) {
//             if (err) {
//                 reject(err);
//             } else {
//                 resolve(token);
//             }
//         });
//     });
//     return promise;
// };

const create = (user) => {
    // console.log(user);
    let payload = {
        _id: user._id,
        username: user.username,
    }
    return jwtUtils.sign(payload, SECRET);
};

const tokenService = {
    create
};

module.exports = tokenService;