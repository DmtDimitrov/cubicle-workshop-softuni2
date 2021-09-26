const express = require('express');

const env = process.env.NODE_ENV || 'development';
const config = require('./config/config.js')[env];
const expressConfig = require('./config/express.js');
const routes = require('./config/routes.js');
const app = express();

expressConfig.initHandlebars(app);
expressConfig.initStaticFiles(app);

app.use(routes);

const message = `Application is running on http://localhost:${config.port}`;

app.listen(config.port, console.log.bind(console, message));