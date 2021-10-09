const router = require('express').Router();
const authService = require('../services/authService.js');
const tokenService = require('../services/tokenService.js');


const loginViewRoute = (req, res) => {
    res.render('auth/login');
}

const loginRoute = async (req, res) => {
    try {
        let { username, password } = req.body;

        let user = await authService.login(username, password);

        if (!user) {
            return res.redirect('/404');
        };

        let token = await tokenService.create(user);
        // console.log(`user: ${user}`);
        // console.log(`token: ${token}`);

        res.cookie('jwtToken', token, {
            httpOnly: true
        });

        res.redirect('/');


    } catch (error) {
        res.status(400).send(error.message);
        res.end();
    }
};

const registerViewRoute = (req, res) => {
    res.render('auth/register');
}

const registerRoute = async (req, res) => {
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


router.get('/login', loginViewRoute);
router.post('/login', loginRoute);
router.get('/register', registerViewRoute);
router.post('/register', registerRoute);

module.exports = router;