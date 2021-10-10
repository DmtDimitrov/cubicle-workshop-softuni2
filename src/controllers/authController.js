const router = require('express').Router();
const authService = require('../services/authService.js');
const tokenService = require('../services/tokenService.js');
const { TOKEN_COOKIE_NAME } = require('../constants.js');


const getLoginView = (req, res) => {
    res.render('auth/login');
}

const postLoginView = async (req, res) => {
    try {
        let { username, password } = req.body;

        let user = await authService.login(username, password);

        if (!user) {
            return res.redirect('/404');
        };

        let token = await tokenService.create(user);
        // console.log(`user: ${user}`);
        // console.log(`token: ${token}`);
        // console.log(`token: ${token}`);

        res.cookie(TOKEN_COOKIE_NAME, token, {
            httpOnly: true
        });


        res.redirect('/');


    } catch (error) {
        res.status(400).send(error.message);
        res.end();
    }
};

const getRegisterView = (req, res) => {
    res.render('auth/register');
}

const postRegisterView = async (req, res) => {
    try {
        // console.log(req.body);
        let { username, password, repeatPassword } = req.body;
        await authService.register(username, password, repeatPassword);
        res.redirect('/auth/login');

    } catch (error) {
        res.status(400).send(error.message);
        res.end();
    }
};


router.get('/login', getLoginView);
router.post('/login', postLoginView);
router.get('/register', getRegisterView);
router.post('/register', postRegisterView);

module.exports = router;