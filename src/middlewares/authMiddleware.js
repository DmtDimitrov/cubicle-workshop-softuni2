const { TOKEN_COOKIE_NAME, SECRET } = require('../constants.js');
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    let token = req.cookies[TOKEN_COOKIE_NAME];

    if (!token) {
        return next();
    }

    // TODO: extract jwt.verify to jwt utils and make it promise function
    jwt.verify(token, SECRET, function (err, decodedToken) {
        // console.log(err);
        // console.log(decodedToken);
        if (err) {
            return res.status(401).redirect('/login');
        }

        req.user = decodedToken;
        next();
    });
};

const isAuth = (req, res, next) => {
    if (!req.user) {
        return res.status(401).redirect('/auth/login')
    }
    next();
};

const authMiddleware = {
    verifyToken,
    isAuth
};

module.exports = authMiddleware;