const express = require('express');

const router = express.Router();

const homeView = (req, res) => {
    res.render('index');
};

const aboutView = (req, res) => {
    res.render('about');
}

router.get ('/', homeView);
router.get ('/about', aboutView);

module.exports = router;