const express = require('express');

const router = express.Router();

const getErrorView = (req, res) => {
    res.status(404).render('404');
}

router.get('*', getErrorView);

module.exports = router;