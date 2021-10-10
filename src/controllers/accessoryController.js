const express = require('express');

const accessoryService = require('../services/accessoryService.js');

const router = express.Router();

const getCreateAccessoryView = (req, res) => {
    res.render('accessory/create');
};

const postCreateAccessoryView = async (req, res) => {
    let { name, description, imageUrl } = req.body;
    try {
        await accessoryService.create(name, description, imageUrl);
        
        res.redirect('/'); 
    } catch (error) {
        res.status(400).send(error.message);
        res.end();
    }
};

router.get('/create', getCreateAccessoryView);
router.post('/create', postCreateAccessoryView);

module.exports = router;