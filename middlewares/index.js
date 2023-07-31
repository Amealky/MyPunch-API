module.exports = (api) => {
    api.middlewares = {
        ensureAuthenticated: require('./ensureAuthenticated')(api),
        bodyParser: require('body-parser')
    };
};
