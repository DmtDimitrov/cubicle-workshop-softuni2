const express = require('express');

const accessoryService = require('../services/accessoryService.js');

const router = express.Router();

const createAccessoryView = (req, res) => {
    res.render('accessory/create');
};

const createAccessory = async (req, res) => {
    let { name, description, imageUrl } = req.body;
    try {
        await accessoryService.create(name, description, imageUrl);
        
        res.redirect('/'); 
    } catch (error) {
        res.status(400).send(error.message);
    }
};

router.get('/create', createAccessoryView);
router.post('/create', createAccessory);

module.exports = router;