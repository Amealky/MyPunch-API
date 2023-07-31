const router = require('express').Router();

module.exports = (api) => {
    router.post('/login',
        api.middlewares.bodyParser.json(),
        api.actions.auth.login);

    router.post('/logout',
        api.middlewares.ensureAuthenticated,
        api.actions.auth.logout);

    router.get('/check/:token',
        api.actions.auth.checkToken);

    return router;
};
