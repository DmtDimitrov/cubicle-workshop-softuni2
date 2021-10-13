const router = require('express').Router();
const authService = require('../services/authService.js');
const tokenService = require('../services/tokenService.js');
const { TOKEN_COOKIE_NAME } = require('../constants.js');


const getLoginView = (req, res) => {
    res.render('auth/login', { title: 'Login' });
}

const postLoginView = async(req, res) => {
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


    } catch (err) {
        res.render('auth/login', { title: 'Login', error: err.message })
            // res.status(400).send(error.message);
            // res.end();
    }
};

const getRegisterView = (req, res) => {
    res.render('auth/register', { title: 'Register' });
}

const postRegisterView = async(req, res, next) => {
    try {
        // console.log(req.body);
        let { username, password, repeatPassword } = req.body;
        await authService.register(username, password, repeatPassword);
        res.redirect('/auth/login');

    } catch (error) {
        res.status(400).render('auth/register', { title: 'Register', error: error.message })
            // next(error.message)
            // res.locals.error = error.message;
            // res.redirect('/register')
            /////////////////////////////////////////////////////////////////////////
            // res.status(400).send(error.message);
            // res.end();
    }
};

const getLogout = (req, res) => {
    res.clearCookie(TOKEN_COOKIE_NAME);

    res.redirect('/');
};


router.get('/login', getLoginView);
router.post('/login', postLoginView);
router.get('/register', getRegisterView);
router.post('/register', postRegisterView);
router.get('/logout', getLogout);

module.exports = router;