const mongoose = require('mongoose');

// function initDb(url) {
//     return mongoose.connect(url);
// };

async function initDb(url) {
    await mongoose.connect(url);
    console.log('Database connected');
};


module.exports = initDb;