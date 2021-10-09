const jwt = require('jsonwebtoken');
// const util = require('util');

// const sign = util.promisify(jwt.sign)

function sign(payload, secret) {
    let promise = new Promise((resolve, reject) => {
        jwt.sign(payload, secret, function (err, token) {
            if (err) {
                reject(err);
            } else {
                resolve(token);
            }
        });
    });
    return promise;
}; // Transform callback to promise function

const jwtUtils = {
    sign,
};

module.exports = jwtUtils;