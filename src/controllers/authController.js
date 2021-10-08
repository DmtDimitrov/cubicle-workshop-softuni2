const router = require('express').Router();

const loginViewRoute = (req, res) => {
    res.render('auth/login');
}

const loginRoute = (req, res) => {
    console.log(req.body);
    res.redirect('/auth/login');
};

const registerViewRoute = (req, res) => {
    res.render('auth/register');
}

const registerRoute = (req, res) => {
    console.log(req.body);
    res.redirect('/auth/register');
};

router.get('/login', loginViewRoute);
router.post('/login', loginRoute);
router.get('/register', registerViewRoute);
router.post('/register', registerRoute);

module.exports = router;