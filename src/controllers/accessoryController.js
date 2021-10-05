const express = require('express');

const router = express.Router();

const createAccessoryView = (req, res) => {
    res.render('accessory/create');
};

router.get('/create', createAccessoryView);

module.exports = router;