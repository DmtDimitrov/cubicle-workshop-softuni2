
const { SECRET } = require('../constants.js');
const jwtUtils = require('../utils/jwtUtils.js');


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