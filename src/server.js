const express = require('express');
const initDb = require('./config/db.js');
const cookieParser = require('cookie-parser');

const env = process.env.NODE_ENV || 'development';
const config = require('./config/config.js')[env];
const expressConfig = require('./config/express.js');
const routes = require('./config/routes.js');
const app = express();

expressConfig.urlEncoding(app);
app.use(cookieParser());
expressConfig.initHandlebars(app);
expressConfig.initStaticFiles(app);

app.use(routes);

initDb(config.dbConnection)
    .then(() => {
        app.listen(config.port, console.log(`App is running on http://localhost:${config.port}`));
    })
    .catch(err => {
        console.log('Application init failed: ', err);
    })


