const router = require('express').Router();

module.exports = (api) => {
    router.get('/',
    api.actions.sessions.findAll);

    router.get('/:id',
    api.middlewares.ensureAuthenticated,
    api.actions.sessions.findForUser);

    router.post('/',
    api.middlewares.ensureAuthenticated,
    api.middlewares.bodyParser.json(),
    api.actions.sessions.create);


    return router;
};