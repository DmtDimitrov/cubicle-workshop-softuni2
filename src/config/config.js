module.exports = {
    development: {
        port: process.env.PORT || 3000,
        dbConnection: `mongodb://localhost:27017/cubesdb`
    },
    production: {}
};