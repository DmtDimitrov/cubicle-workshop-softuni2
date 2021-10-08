const express = require('express');

const router = express.Router();

const errorView = (req, res) => {
    res.status(404).render('404');
}

router.get('*', errorView);

module.exports = router;