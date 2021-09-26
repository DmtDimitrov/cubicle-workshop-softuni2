const express = require('express');

const router = express.Router();

const homeView = (req, res) => {
    res.render('index');
};

router.get ('/', homeView);

module.exports = router;