const express = require('express');
const env = process.env.NODE_ENV || 'development';

const config = require('./config/config.js')[env];
const app = express();

console.log('start');
app.all('/', (req, res) => {
    res.write('Started');
    res.end();
})

app.listen(config.port, console.log.bind(console, `Aplication is running on http://localhost:${config.port}`));