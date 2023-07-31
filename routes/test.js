const router = require('express').Router();

module.exports = (api) => {

    router.get('/', (req, res) => {
        res.send('Hello posdosd\n');
    });

    return router;
};
