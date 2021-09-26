const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');

const initHandlebars = (app) => {
    app.set('views', path.resolve(__dirname, '../views'));

    app.engine('hbs', handlebars({
        extname: 'hbs'
    }));
    app.set('view engine', 'hbs');
};

const initStaticFiles = (app) => {
    app.use(express.static(path.resolve(__dirname, '../static')));
};

const urlEncoding = (app) => {
    app.use(express.urlencoded({extended: true}));
};

const expressConfig = {
    initHandlebars,
    initStaticFiles,
    urlEncoding
}

module.exports = expressConfig;