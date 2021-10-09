module.exports = {
    development: {
        port: process.env.PORT || 3000,
        dbConnection: `mongodb://localhost:27017/cubesdb`,
        jwt_secret: '6BF881D4F5A97A8BD56CE9CB9443E'
    },
    production: {}
};